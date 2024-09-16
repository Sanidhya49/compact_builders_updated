from flask import Flask, render_template, request, redirect, url_for, flash
import os
import uuid  # to generate unique filenames
import mysql.connector

app = Flask(__name__,static_folder='static')

app.secret_key='4S$eJ#8dLpM2aB9cD1fGhK3'

db_host = "localhost"  # 127.0.0.1 
db_user = "root"
db_password ="harsh@29292929"
db_name = "website_db"

# Connect to MySQL
db = mysql.connector.connect(
    host=db_host,
    user=db_user,
    password=db_password,
    database=db_name
)

cursor = db.cursor()

# Create a 'lead-gen' table if not exists
cursor.execute("""
    CREATE TABLE IF NOT EXISTS cart (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(255) NOT NULL,
        price INT UNSIGNED NOT NULL,
        quantity INT UNSIGNED NOT NULL,
        image_path VARCHAR(255)
    )
""")
db.commit()