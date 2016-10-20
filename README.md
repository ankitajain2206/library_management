# library_management
It is a small application which perform CRUD operation using express, nodejs, rabbitmq and redis.

use of rabbitmq in application:
Exchange used: direct (routing key is matched with binding key)

Whenever user add, delete or get book then request goes to the exchange. A request goes to the queue whose binding key exactly matches the routing key of the message.
The request is completed from queue and a response is generated which is again sent from queue to user. 

