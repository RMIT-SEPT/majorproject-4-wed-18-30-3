from datetime import datetime, timedelta
import requests
import random
import json
import time


def add_timeslots(n: int, min_duration: int, start_timestamp=None):
    """
    Batch-add timeslots to backend

    Args:
        n: number of timeslots to add
        min_duration: size of each individual timeslot
        start_timestamp: datetime from which to begin adding timeslots.
                         Use current date and time if none provided.
    """

    now = datetime.now()

    # Round start timestamp to nearest min_duration increment
    mins = (now.minute - (now.minute % min_duration))
    start = (datetime(now.year, now.month, now.day, now.hour, mins) +
             timedelta(minutes=min_duration))

    to_return = start

    for i in range(n):
        payload = {
            'date': start.strftime("%Y-%m-%d-%H-%M-%S"),
            'duration': min_duration,
            'created_At': now.strftime("%Y-%m-%d-%H-%M-%S"),
            'updated_At': now.strftime("%Y-%m-%d-%H-%M-%S")
        }

        start += timedelta(minutes=min_duration)
        r = requests.post("http://localhost:8080/api/timeslot", json=payload)
        print("Response", r.status_code, r.json())

    return to_return


def add_services(services: list, min_duration):
    """
    Batch-add services to backend

    Args:
        services: list of service dictionaries {"name": "", duration: ""}
        min_duration: size of each individual timeslot
    """

    for i in services:

        duration = i["duration"] if i["duration"] >= min_duration else min_duration

        payload = {
            "id": i["id"],
            "name": i["name"],
            "minDuration": duration}

        r = requests.post("http://localhost:8080/api/serviceProvided", json=payload)
        print("Response", r.status_code, r.json())


def add_workers(workers: list):
    """
    Batch-add workers to backend

    Args:
        workers: list of worker dictionaries {"address": "", password: "", etc}
    """

    for i in workers:

        payload = {
            "id": i["id"],
            "userName": i["userName"],
            "password": i["password"],
            "address": i["address"],
            "phone": i["phone"],
            "services": i["services"]}

        r = requests.post("http://localhost:8080/api/worker", json=payload)
        print("Response", r.status_code, r.json())


def add_customers(customers: list):
    """
    Batch-add customers to backend

    Args:
        customers: list of customer dictionaries {"userName": "", password: "", etc}
    """

    for i in customers:

        payload = {
            "id": i["id"],
            "userName": i["userName"],
            "password": i["password"],
            "address": i["address"],
            "phone": i["phone"]}

        r = requests.post("http://localhost:8080/api/customer", json=payload)
        print("Response", r.status_code, r.json())


def add_bookings(start_time, n: int, workers: list, customers: list, start_timestamp=None):
    """
    Batch-add bookings to backend

    Args:
        n: number of bookings to add
        min_duration: size of each individual booking
        workers: dict of workers, to be randomly inserted into each booking
        customers: dict of customers, to be randomly chosen for each booking
        start_timestamp: datetime from which to begin adding bookings.
                         Use current date and time if none provided.
    """

    now = datetime.now()

    # Round start timestamp to nearest min_duration increment
    mins = (now.minute - (now.minute % min_duration))
    start = start_time

    for i in range(n):

        booking_id = 1

        # Randomly select a worker and customer
        worker = random.choice(workers)
        customer = random.choice(customers)

        payload = {
            'id': str(booking_id),
            'created_At': now.strftime("%Y-%m-%d-%H-%M-%S"),
            'updated_At': now.strftime("%Y-%m-%d-%H-%M-%S"),
            'worker': {"id": str(worker["id"])},
            'timeslot': {"date": start.strftime("%Y-%m-%d-%H-%M-%S")},
            'service': {"id": str(worker["services"][0]["id"])},
            'customer': {"id": str(customer["id"])},
        }
        booking_id += 1
        start += timedelta(minutes=min_duration)
        r = requests.post("http://localhost:8080/api/booking", json=payload)
        print("Response", r.status_code, r.json()["timeslot"])
        # print(payload)
        # print(json.dumps(payload))


services = [
    {"id": 1, "name": "mowing", "duration": 60},
    {"id": 2, "name": "hedging", "duration": 60},
    {"id": 3, "name": "massage", "duration": 30},
    {"id": 4, "name": "pool cleaning", "duration": 60},
    {"id": 5, "name": "manicure", "duration": 30}]

workers = [
    {"id": 1, "userName": "Jim", "password": "123",
     "address": "Just Round the Corner", "phone": "1234567890",
     "services": [{"id": 1, "name": "mowing", "minDuration": 60}]},
    {"id": 2, "userName": "Wendy", "password": "123",
     "address": "Wendy's luv shack", "phone": "1234567890",
     "services": [{"id": 3, "name": "massage", "minDuration": 60}]},
    {"id": 3, "userName": "Hector", "password": "123",
     "address": "A friends house", "phone": "1234567890",
     "services": [{"id": 4, "name": "pool cleaning", "minDuration": 60}]}]

customers = [
    {"id": 1, "userName": "Rob", "password": "123",
     "address": "Just Round the Corner", "phone": "1234567890"},
    {"id": 2, "userName": "Mary", "password": "123",
     "address": "Up the street", "phone": "1234567890"},
    {"id": 3, "userName": "Bob", "password": "123",
     "address": "Down the lane", "phone": "1234567890"}]

number_of_timeslots = 5
min_duration = 30

start_time = add_timeslots(number_of_timeslots, min_duration)
add_services(services, min_duration)
add_workers(workers)
add_customers(customers)
add_bookings(start_time, number_of_timeslots, workers, customers)