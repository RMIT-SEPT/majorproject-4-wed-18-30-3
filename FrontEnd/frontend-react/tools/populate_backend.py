from datetime import datetime, timedelta
from time import sleep
import requests
import random
import json
import time


services = [
    {"id": 1, "name": "mowing", "duration": 60},
    {"id": 2, "name": "hedging", "duration": 60},
    {"id": 3, "name": "massage", "duration": 30},
    {"id": 4, "name": "pool cleaning", "duration": 60},
    {"id": 5, "name": "manicure", "duration": 30}]

workers = [
    {
        "user": {
            "userName": "Jim", "password": "123",
            "address": "Just Round the Corner", "phone": "1234567890",
            "userType": "WORKER"},
        "services": [
            {"name": "mowing", "minDuration": 60}],
        "companyName": "Jim's Mowing"},

    {
        "user": {
            "userName": "Wendy", "password": "123",
            "address": "Wendy's House", "phone": "1234567890",
            "userType": "WORKER"},
        "services": [
            {"name": "massage", "minDuration": 60}],
        "companyName": "Wendy's Wonderful Massage"},

    {
        "user": {
            "userName": "Dave", "password": "123",
            "address": "A friends house", "phone": "1234567890",
            "userType": "WORKER"},
        "services": [
            {"name": "pool cleaning", "minDuration": 60}],
        "companyName": "Dave's pool services"}]

admins = [
    {
        "user": {
            "userName": "Trev", "password": "123",
            "address": "Big T's place", "phone": "1234567890",
            "userType": "ADMIN"}
    }]

customers = [
    {
        "user": {
            "userName": "Jo", "password": "123", "address": "Round the Corner",
            "phone": "1234567890", "userType": "CUSTOMER"}},

    {
        "user": {
            "userName": "Mary", "password": "123", "address": "Up the street",
            "phone": "1234567890", "userType": "CUSTOMER"}},

    {
        "user": {
            "userName": "Bob", "password": "123", "address": "Down the lane",
            "phone": "1234567890", "userType": "CUSTOMER"}}]


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

    timeslots = []
    for i in range(n):

        timeslot = start.strftime("%Y-%m-%d-%H-%M-%S")
        timeslots.append(timeslot)

        payload = {
            'date': timeslot,
            'duration': min_duration,
            'created_At': now.strftime("%Y-%m-%d-%H-%M-%S"),
            'updated_At': now.strftime("%Y-%m-%d-%H-%M-%S")
        }

        start += timedelta(minutes=min_duration)
        r = requests.post(url + "/api/timeslot", json=payload)
        print("Response", r.status_code, r.json())

    return timeslots


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

        r = requests.post(url + "/api/serviceProvided", json=payload)
        print("Response", r.status_code, r.json())


def add_workers(workers: list):
    """
    Batch-add workers to backend

    Args:
        workers: list of worker dictionaries {"address": "", password: "", etc}
    """

    for i in workers:

        payload = {
            "user": {
                "userName": i["user"]["userName"],
                "password": i["user"]["password"],
                "address": i["user"]["address"],
                "phone": i["user"]["phone"],
                "userType": i["user"]["userType"]},
            "services": i["services"],
            "companyName": i["companyName"]}

        r = requests.post(url + "/api/worker", json=payload)
        print("Response", r.status_code, r.json())


def add_admins(admins: list):
    """
    Batch-add admins to backend

    Args:
        workers: list of admin dictionaries
    """

    for i in admins:

        payload = {
            "user": {
                "userName": i["user"]["userName"],
                "password": i["user"]["password"],
                "address": i["user"]["address"],
                "phone": i["user"]["phone"],
                "userType": i["user"]["userType"]}}

        r = requests.post(url + "/api/admin", json=payload)
        print("Response", r.status_code, r.json())


def add_customers(customers: list):
    """
    Batch-add customers to backend

    Args:
        customers: list of customer dictionaries {"userName": "", password: "", etc}
    """

    for i in customers:

        payload = {
            "user": {
                "userName": i["user"]["userName"],
                "password": i["user"]["password"],
                "address": i["user"]["address"],
                "phone": i["user"]["phone"],
                "userType": i["user"]["userType"]}}

        r = requests.post(url + "/api/customer", json=payload)
        print("Response", r.status_code, r.json())


def add_availabilites(timeslots: list, workers: list, customers: list, min_duration: int, start_timestamp=None):
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
    booking_id = 1

    for timeslot in timeslots:

        # Randomly select a worker and customer
        worker_name = random.choice(workers)["user"]["userName"]
        print(worker_name)
        customer = random.choice(customers)

        payload = {
            # 'id': str(booking_id),
            # 'created_At': now.strftime("%Y-%m-%d-%H-%M-%S"),
            # 'updated_At': now.strftime("%Y-%m-%d-%H-%M-%S"),
            'worker': {"user": {"userName": worker_name}},
            'timeslot': {"date": timeslot},
            # 'service': {"id": str(worker["services"][0]["id"])},
            # 'customer': {"id": str(customer["id"])},
        }
        booking_id += 1
        r = requests.post(url + "/api/booking", json=payload)
        print("Response", r.status_code, r.json())
        # print(payload)
        # print(json.dumps(payload))


def get_timeslots():
    r = requests.get(url + "/api/timeslot/all")
    print(json.dumps(r.json(), indent=2))


def get_bookings():
    r = requests.get(url + "/api/booking/all")
    print(json.dumps(r.json(), indent=2))


def get_workers(workers):
    for worker in workers:
        r = requests.get(url + "/api/worker/" + worker['user']["userName"])
        print("Response", r.status_code, r.json())


def get_customers(customers):
    for customer in customers:
        r = requests.get(url + "/api/customer/" + customer['user']["userName"])
        print("Response", r.status_code, r.json())


number_of_timeslots = 100
min_duration = 30
url = "http://localhost:8080"
# url = "http://ec2-34-204-47-86.compute-1.amazonaws.com:8080"

timeslots = add_timeslots(number_of_timeslots, min_duration)
add_services(services, min_duration)
add_workers(workers)
add_admins(admins)
add_customers(customers)
add_availabilites(timeslots, workers, customers, min_duration)


# get_timeslots()
# get_bookings()
# get_workers(workers)
# get_customers(customers)
