#!/usr/bin/env pybricks-micropython
#!/usr/bin/env python3
import os
import sys
import socket
from pybricks.ev3devices import Motor, ColorSensor, UltrasonicSensor
from pybricks.nxtdevices import LightSensor
from pybricks.parameters import Port, Button, Color
from pybricks.tools import wait
from pybricks.robotics import DriveBase
from pybricks.hubs import EV3Brick

ON = True
OFF = False

# possible colored_landmark on mpa
BLUE = 0
GREEN = 1
YELLOW = 2
TURN = 3
PURPLE = 4
BLACK = 5
WHITE = 6
RED = 7
BROWN = 8
AUTO = 9

#for turning
right = 1
left = 0

def debug_print(*args, **kwargs):
    '''Print debug messages to stderr.
    This shows up in the output panel in VS Code.
    '''
    print(*args, **kwargs, file=sys.stderr)


def reset_console():
    '''Resets the console to the default state'''
    print('\x1Bc', end='')


def set_cursor(state):
    '''Turn the cursor on or off'''
    if state:
        print('\x1B[?25h', end='')
    else:
        print('\x1B[?25l', end='')


def set_font(name):
    '''Sets the console font
    A full list of fonts can be found with `ls /usr/share/consolefonts`
    '''
    os.system('setfont ' + name)


def start(right_motor,left_motor, arm_motor,ladar_motor,light_sensor_line,light_sensot_landmark, color_sensor, ultrasonic_sensor):
    color_dict = {
        '0': BLUE,
        '1': GREEN,
        '2': YELLOW,
        '5': BLACK,
        '6': WHITE,
        '7': RED,
        '8': BROWN,
        '9': AUTO
    }
    me_dict = {
        "0" : 0,  # "pickup"
        "1" : 1   # "wait"
    }
    
    #read command from python ptc based server
    command = get_commmand()

    debug_print("command is "+ command)

    if command is None:
        auto_or_server = 0
        wait_or_pickup = 1
    else:
        result = color_dict[command[0]]
        wait_or_pickup = me_dict[command[1]] 
    
    auto_or_server = 0
    if result in range(0,7):
        auto_or_server = 1
       
    debug_print(auto_or_server)
    debug_print(wait_or_pickup)


    turning_count = 0
    landmark_count = 0
    turning_direction = [left, left, left, left, right, left]
    
    landmark_order = [PURPLE,   # Ladmark for entering warehouse
                    TURN,       #check point 1 , and turn left
                    BLACK,      #Black House
                    RED,        #RED HOUSE
                    WHITE,      #WHIRE HOUSE
                    TURN,       #check point 2, and turn left
                    GREEN,      #green House
                    YELLOW,     #Yello House
                    TURN,       #check point 3, and turn left
                    BLUE,       #blue House
                    BROWN,      #brown House
                    TURN, #check point 4, and turn left
                    TURN, #check point 5, and turn right
                    TURN, #check point 6, and turn left
                    ]
    #define our robot
    robot = DriveBase(left_motor, right_motor, wheel_diameter=70, axle_track=104)  

    ev3 = EV3Brick()
    ev3.light.on(Color.GREEN)
    ev3. speaker.set_speech_options(language='en', voice='f1', speed=110, pitch=50)
    
    # Calculate the light threshold. Choose values based on your measurements.
    BLACK_reflection = 12
    WHITE_reflection = 95
    threshold = (BLACK_reflection + WHITE_reflection) / 2

    # Set the drive speed at 100 millimeters per second.
    DRIVE_SPEED = 120    

    # Set the gain of the proportional line controller. This means that for every
    # percentage point of light deviating from the threshold, we set the turn
    # rate of the drivebase to 1.2 degrees per second.
    # For example, if the light value deviates from the threshold by 10, the robot
    # steers at 10*1 = 10 degrees per second.

    PROPORTIONAL_GAIN = 1
    back_to_warehouse = 0
    package_color = in_wareHouse(robot, arm_motor,ladar_motor,light_sensot_landmark, color_sensor, ultrasonic_sensor, ev3, auto_or_server, result)
    package_delivered = 0
    robot_location = 1
    #debug_print("package_color is "+ str(package_color))

    # send the statue to our server
    send_status_to_server(str(package_delivered) + str(robot_location) + str(package_color))

    while True:
        # Calculate the deviation from the threshold.
        deviation = light_sensor_line.reflection() - threshold
        # Calculate the turn rate.
        turn_rate = PROPORTIONAL_GAIN * deviation
        # Set the drive base speed and turn rate.
        robot.drive(DRIVE_SPEED, turn_rate)

        color = light_sensot_landmark.reflection()
        distance = ultrasonic_sensor.distance()
        
        # if a landmark is detected, then check which it block
        if(color < WHITE_reflection - 10 and color > BLACK_reflection + 30):       
            landmark_color = landmark_order[landmark_count]
            landmark_count += 1
            landmark_count %= len(landmark_order)
            debug_print("landmark_color is :"+str(landmark_color))
            wait(250)
            
            if landmark_color is TURN:
                robot.stop()
                wait(250)  
                turn = turning_direction[turning_count]
                #debug_print("turn is :"+str(turn))
                turning_count += 1
                turning_count %= len(turning_direction)
                if turn is left:
                    robot.stop()
                    robot_location += 1
                    robot_location %= 6
                    if robot_location == 0:
                        robot_location = 1 
                    # update statue to server
                    send_status_to_server(str(package_delivered) + str(robot_location) + str(package_color))

                    ev3.speaker.say("Now turning left")
                    turn_left(robot, ultrasonic_sensor, ladar_motor, ev3)
                else:
                    ev3.speaker.say("Now turning right")
                    turn_right(robot, ultrasonic_sensor, ladar_motor, ev3)
                    
            elif landmark_color is PURPLE: 
                robot.stop()
                wait(250)
                if back_to_warehouse is 1: #if back_to_warehouse is one means we need to go to warehouse to deal with next package
                    if package_delivered is 1:
                        robot.straight(-400)
                        arm_motor.run_angle(100, 90)
                 
                    else:
                        robot.straight(-200)
                        ev3.speaker.say("please remove package before load new one!")
                        while True:
                            color = color_sensor.color()
                            if color is None:
                                break
                            wait(500)
                        robot.straight(-200)
                        arm_motor.run_angle(100, 90)
                        
                    # update = os.system("python3 webReading.py")
                    # result = result = read_mode()
                    back_to_warehouse = 0
                    turning_count = 0
                    landmark_count = 0
                    package_delivered = 0
                    
                    # change to auto mode
                    wait_or_pickup = 1 
                    auto_or_server = 0
                    #
                    send_status_to_server(str(package_delivered) + str(0) + str(package_color))
                    command = get_commmand()
                    if command is None:
                        auto_or_server = 0
                        wait_or_pickup = 1
                    else:
                        result = color_dict[command[0]]
                        wait_or_pickup = me_dict[command[1]] 
                    
                    auto_or_server = 0
                    if result in range(0,7):
                        auto_or_server = 1
                    #
                    package_color = in_wareHouse(robot, arm_motor,ladar_motor,light_sensot_landmark, color_sensor, ultrasonic_sensor, ev3, auto_or_server, result)
    
            else:
                robot.stop()
                wait(250)
                #delivering package
                if landmark_color is package_color:
                    deliver_package(ev3, wait_or_pickup, color_sensor)
                    wait(250)
                    print("package_exist ")
                    # after deliver_package process, if color sensor can still read date, it means package is not taken
                    if color_sensor.color() is None or get_color_index(color_sensor.color()) is not package_color:
                        package_delivered = 1
                        send_status_to_server(str(package_delivered) + str(robot_location) + str(package_color))
                    else:
                        package_delivered = 0
                    back_to_warehouse = 1 
                   

        if(distance < 50 ):
            robot.stop()
            ev3.light.on(Color.RED)
            while True:
                distance = ultrasonic_sensor.distance()
                ev3.speaker.beep(frequency=500, duration=100)
                if distance > 50:
                    ev3.light.on(Color.GREEN)
                    break
                wait(500)

# tell people to pick up their package      
def deliver_package(ev3, wait_or_pickup, color_sensor):
    if wait_or_pickup is 1:
        ev3.speaker.say("please pick up your package in 5 count")
        count = ["five", "four", "three", "two", "one"]
        for i in count:
            ev3.speaker.say(i)
            if color_sensor.color() is None:
                break
    else: 
        while True:
            color = color_sensor.color()
            if color is None:
                break
            ev3.speaker.say("please pick up your package")
        ev3.speaker.say("package is taken, leaving now")

# let robot turn left 90 degree
def turn_left(drive_base, ultrasonic_sensor, ladar_motor, ev3):
    drive_base.straight(5)
    check_safety(drive_base, ladar_motor, ultrasonic_sensor, ev3)
    drive_base.turn(-95)
    pass

# let robot turn right 90 degree
def turn_right(drive_base, ultrasonic_sensor, ladar_motor, ev3):
    drive_base.straight(30)
    check_safety(drive_base, ladar_motor, ultrasonic_sensor, ev3)
    drive_base.turn(95)
    pass


# the robot using ultrasonic_sensor to check it's sorrounding enviroment 
def check_safety(drive_base, ladar_motor,ultrasonic_sensor, ev3):
    drive_base.stop()
    ladar_motor.run_angle(100, 210)
    for i in range(0,43):
        ladar_motor.run_angle(100, -10)
        distance = ultrasonic_sensor.distance()
        # if less than 5 cm, then stop
        if(distance < 50 ):
            ev3.light.on(Color.RED)
            while True:
                distance = ultrasonic_sensor.distance()
                ev3.speaker.say("obstacle detected, waiting for clear path")
                if distance > 50:
                    ev3.light.on(Color.GREEN)
                    break
                wait(500)
    ladar_motor.run_angle(100, 210)

# defines how robot behave when in wareHouse
def in_wareHouse(drive_base, arm_motor,ladar_motor,light_sensot_landmark, color_sensor, ultrasonic_sensor,ev3, auto_or_server, stripped):
    drive_base.stop()
    ev3.light.on(Color.YELLOW)
    wait(200)
    arm_motor.run_angle(50, -90)
    wait(200)
    package_color = None
    if auto_or_server == 0:
        while package_color is None:
            package_color = detecte_package_color(drive_base, arm_motor,ladar_motor,light_sensot_landmark, color_sensor, ultrasonic_sensor,ev3, 1)
            debug_print("package_color is "+ str(package_color))
            wait(200)
            if package_color is not None:
                break
            wait(1000)
    else:
        detecte_package_color(drive_base, arm_motor,ladar_motor,light_sensot_landmark, color_sensor, ultrasonic_sensor,ev3, 0)
        if stripped is BLACK:
            ev3.speaker.say("recieved from server, now deliver to black house")
            package_color = BLACK

        elif stripped is BLUE:
            ev3.speaker.say("recieved from server, now deliver to blue house")
            package_color = BLUE

        elif stripped is GREEN:
            ev3.speaker.say("recieved from server, now deliver to green house")
            package_color = GREEN

        elif stripped is YELLOW:
            ev3.speaker.say("recieved from server, now deliver to yellow house")
            package_color = YELLOW

        elif stripped is RED:
            ev3.speaker.say("recieved from server, now deliver to red house")
            package_color = RED

        elif stripped is WHITE:
            ev3.speaker.say("recieved from server, now deliver to white house")
            package_color = WHITE

        elif stripped is BROWN:
            ev3.speaker.say("recieved from server, now deliver to brown house")
            package_color = BROWN



    ev3.light.on(Color.GREEN)
    check_safety(drive_base, ladar_motor,ultrasonic_sensor, ev3)
    drive_base.straight(200)
    return package_color

#this function check and confirm the color of our package, and decided which house our robot will goes to
def detecte_package_color(drive_base, arm_motor,ladar_motor,light_sensot_landmark, color_sensor, ultrasonic_sensor,ev3, say):
    #check if there is package
    package_color = None
    while True:
        #first time reading color 
        package_color1 = get_color_index(color_sensor.color())
        debug_print("package_color1 is "+ str(package_color1))

        if package_color1 is None:
            ev3.speaker.say("package not detected, retry now")   
        else:
            #debug_print("package detected")   
            wait(500)
        # second time reading color 
        package_color2 = get_color_index(color_sensor.color())
        debug_print("package_color2 is "+ str(package_color2))
        if package_color2 is None:
            if package_color1 is None:
                ev3.speaker.say("package not detected, sleep now")
                wait(100)
                while True:
                    distance = ultrasonic_sensor.distance()
                    if distance < 50:
                        ev3.speaker.say("wake up")
                        wait(100)
                        break
                    wait(500)
            else:
               ev3.speaker.say("package color detected error, retry now")
               wait(1000)
        if say == 1:# tell people whaich package is it 
            if package_color1 is package_color2:
                if package_color1 is BLACK :
                    ev3.speaker.say("package confirmed, now deliver to black house")
                elif package_color1 is BLUE:
                    ev3.speaker.say("package confirmed, now deliver to blue house")
                elif package_color1 is GREEN:
                    ev3.speaker.say("package confirmed, now deliver to green house")
                elif package_color1 is YELLOW:
                    ev3.speaker.say("package confirmed, now deliver to yellow house")
                elif package_color1 is RED:                    
                    ev3.speaker.say("package confirmed, now deliver to red house")
                elif package_color1 is WHITE:
                    ev3.speaker.say("package confirmed, now deliver to white house")
                elif package_color1 is BROWN:
                    ev3.speaker.say("package confirmed, now deliver to brown house")                
                return package_color1 
        else:
            return 
            
     
def get_color_index(package_color):
    if package_color is Color.BLACK :
        return BLACK
    elif package_color is Color.BLUE:
        return BLUE
    elif package_color is Color.GREEN:
        return GREEN
    elif package_color is Color.YELLOW:
        return YELLOW  
    elif package_color is Color.RED:
        return RED
    elif package_color is Color.WHITE:
        return WHITE
    elif package_color is Color.BROWN:
        return BROWN
    else:
        return None

#send data to our python-base sever
def send_status_to_server(data): #data should be string
    print("data is " + data)
    host = "10.93.48.134"
    port = 443                   # The same port as used by the server
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((host, port))
    s.send(bytes(data, 'utf-8'))
    count = 0
    s.close()

#get command from our server
def get_commmand():
    host = "10.93.48.134"
    port = 443                   # The same port as used by the server
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((host, port))
    s.send(bytes("9", 'utf-8'))
    count = 0
    while True:
        data = s.recv(128)
        if data is not None:
            ackText = data.decode('utf-8')
            print(ackText)
            break
    s.close()
    return data.decode()


def main():
    '''The main function of our program'''
    # set the console just how we want it
    reset_console()
    set_cursor(OFF)
    set_font('Lat15-Terminus24x12')

    # Initialize the motors.
    right_motor = Motor(Port.D)
    left_motor = Motor(Port.A)
    arm_motor = Motor(Port.B) 
    ladar_motor = Motor(Port.C)    #220 to -210

    # Initialize the sensors.
    light_sensor_line = LightSensor(Port.S1)
    light_sensot_landmark = LightSensor(Port.S2)
    ultrasonic_sensor = UltrasonicSensor(Port.S3)
    color_sensor = ColorSensor(Port.S4)
    
    start(right_motor,left_motor, arm_motor,ladar_motor,light_sensor_line,light_sensot_landmark, color_sensor, ultrasonic_sensor)


if __name__ == '__main__':
    main()