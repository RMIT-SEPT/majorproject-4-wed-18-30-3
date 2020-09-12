from datetime import datetime, timedelta
import requests
import json
import time


def add_services(services: list, min_duration):
    """
    Batch-add services to backend

    Args:
        services: list of service dictionaries {"name": "", duration: ""}
        min_duration: size of each individual timeslot
    """

    service_id = 1

    for i in services:

        duration = i["duration"] if i["duration"] >= min_duration else min_duration

        payload = {
            # "id": service_id,
            "name": i["name"],
            "minDuration": duration}

        service_id += 1
        r = requests.post("http://localhost:8080/api/serviceProvided", json=payload)
        print("Response", r.status_code, r.json())


def add_workers(workers: list):
    """
    Batch-add workers to backend

    Args:
        workers: list of worker dictionaries {"address": "", password: "", etc}
    """

    worker_id = 1

    for i in workers:

        payload = {
            # "id": worker_id,
            "userName": i["userName"],
            "password": i["password"],
            "address": i["address"],
            "phone": i["phone"],
            "services": i["services"]}

        worker_id += 1
        r = requests.post("http://localhost:8080/api/worker", json=payload)
        # print("Response", r.status_code, r.json())
        print(json.dumps(payload, indent=2))


def add_timeslots(n: int, min_duration: int, start_timestamp=None):
    """
    Batch-add timeslots to backend

    Args:
        n: number of timeslots to add
        min_duration: size of each individual timeslot
        start_timestamp: datetime from which to begin adding timeslots.
                         Use current date and time if none provided.
    """

    timeslot_id = 1
    now = datetime.now()

    # Round start timestamp to nearest min_duration increment
    mins = (now.minute - (now.minute % min_duration))
    start = (datetime(now.year, now.month, now.day, now.hour, mins) +
             timedelta(minutes=min_duration))

    for i in range(n):
        payload = {
            # 'id': timeslot_id,
            'date': start.strftime("%Y-%m-%d-%H-%M-%S"),
            'duration': min_duration,
            'created_At': now.strftime("%Y-%m-%d-%H-%M-%S"),
            'updated_At': now.strftime("%Y-%m-%d-%H-%M-%S")
        }

        timeslot_id += 1
        start += timedelta(minutes=min_duration)
        r = requests.post("http://localhost:8080/api/timeslot", json=payload)
        print("Response", r.status_code, r.json())


services = [
    {"name": "mowing", "duration": 60},
    {"name": "hedging", "duration": 60},
    {"name": "massage", "duration": 30},
    {"name": "pool cleaning", "duration": 60},
    {"name": "manicure", "duration": 30}]

workers = [
    {"id": 1, "userName": "Jim", "password": "123",
     "address": "Just Round the Corner", "phone": "1234567890",
     "services": [
        {"id": 1, "name": "mowing", "minDuration": 60},
        {"id": 2, "name": "hedging", "minDuration": 60},
        {"id": 4, "name": "hedging", "minDuration": 60}]},

    {"id": 2, "userName": "Wendy", "password": "123",
     "address": "Wendy's luv shack", "phone": "1234567890",
     "services": [
        {"id": 3, "name": "mowing", "minDuration": 60},
        {"id": 5, "name": "hedging", "minDuration": 60}]},

    {"id": 3, "userName": "Hector", "password": "123",
     "address": "A friends house", "phone": "1234567890",
     "services": [
        {"id": 1, "name": "mowing", "minDuration": 60},
        {"id": 2, "name": "hedging", "minDuration": 60},
        {"id": 3, "name": "mowing", "minDuration": 60},
        {"id": 4, "name": "hedging", "minDuration": 60},
        {"id": 5, "name": "hedging", "minDuration": 60}]}
    ]

number_of_timeslots = 5
min_duration = 30

# add_timeslots(number_of_timeslots, min_duration)
# add_services(services, min_duration)
add_workers(workers)
