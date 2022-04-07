import os
import socket
from time import sleep
import re

if __name__ == "__main__":
    color_dict = {
        "blue": 0,
        "green": 1,
        "yellow": 2,
        "black": 5,
        "white": 6,
        "red": 7,
        "brown": 8,
        "auto": 9
    }
    me_dict = {
        "pickup": 0,
        "wait": 1,
    }
    # Create a stream based socket(i.e, a TCP socket)
    # operating on IPv4 addressing scheme
    serverSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # Bind and listen
    serverSocket.bind(("10.93.48.134", 443))
    serverSocket.listen()
    # Accept connections
    serverSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # Bind and listen
    serverSocket.bind(("10.93.48.134", 443))
    serverSocket.listen()
    # Accept connections
    old_job_id = -1
    destination = "auto"
    deliver_method = "pickup"
    while (True):
        os.system("sudo node ordertransmit.js")
        os.system("sudo node map.js")
        #listen to the port if any successful connection 
        (clientConnected, clientAddress) = serverSocket.accept()
        print("Accepted a connection request from %s:%s" % (clientAddress[0], clientAddress[1]))
        dataFromClient = clientConnected.recv(1024)
        recieve = dataFromClient.decode()
        print(recieve)
        #determine if client want to command or sending command
        if "9" not in recieve:
            command = "python3 write.py " + recieve
            print(command)
            os.system(command)
        elif "9" in recieve:
            # Send some data back to the client
            f = open("secret.html", "r")
            new_job_id = 0
            # sending command to the robot base on the website request 
            for line in f:
                line = line.strip()
                line = re.sub('<[^<]+?>', '', line)
                print(line)
                if "house:" in line:
                    destination = line.replace("house:", "")
                elif "deliver_method:" in line:
                    deliver_method = line.replace("deliver_method:", "")
                    print("deliver_method is" + deliver_method)
                elif "jobid:" in line:
                    new_job_id = line.replace("jobid:", "")
            if old_job_id != new_job_id: #if job id is same then means this job is alreay done
                old_job_id = new_job_id
                command = str(color_dict[destination]) + str(me_dict[deliver_method])
                clientConnected.send(command.encode())
            else:
                command = str('70')
                clientConnected.send(command.encode())
        sleep(0.5)
#ps -fA | grep python

