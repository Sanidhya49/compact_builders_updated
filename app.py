from flask import Flask, render_template, request, redirect, url_for, flash
import os
import uuid  # to generate unique filenames
import mysql.connector

app = Flask(__name__, template_folder='template')
# app = Flask(__name__,static_folder='static')


# app.secret_key='4S$eJ#8dLpM2aB9cD1fGhK3'

# db_host = "localhost"  # 127.0.0.1 
# db_user = "root"
# db_password ="harsh@29292929"
# db_name = "website_db"

# # Connect to MySQL
# db = mysql.connector.connect(
#     host=db_host,
#     user=db_user,
#     password=db_password,
#     database=db_name
# )

# cursor = db.cursor()

# Create a 'cart' table if not exists
# cursor.execute("""
#     CREATE TABLE IF NOT EXISTS cart (
#         id INT AUTO_INCREMENT PRIMARY KEY,
#         category VARCHAR(255) NOT NULL,
#         price INT UNSIGNED NOT NULL,
#         quantity INT UNSIGNED NOT NULL,
#         image_path VARCHAR(255)
#     )
# """)
# db.commit()


# Define a route for the root URL ('/')
# This route will handle the main page of the website
@app.route('/',methods=['GET', 'POST'])
def lead_gen():
    return render_template('lead-gen.html')

@app.route('/customer',methods=['GET', 'POST'])
def customer():
    return render_template('customer.html')


# project page
@app.route('/project',methods=['GET', 'POST'])
def project():
    return render_template('project.html')

@app.route('/project_list',methods=['GET', 'POST'])
def project_list():
    return render_template('project_list.html')

@app.route('/project_view',methods=['GET', 'POST'])
def project_view():
    return render_template('project_view.html')




@app.route('/profession',methods=['GET', 'POST'])
def profession():
    return render_template('profession.html')

@app.route('/occupation',methods=['GET', 'POST'])
def occupation():
    return render_template('occupation.html')

@app.route('/budget',methods=['GET', 'POST'])
def budget():
    return render_template('budget.html')

@app.route('/requirement',methods=['GET', 'POST'])
def requirement():
    return render_template('requirement.html')




# @app.route('/explore_rings',methods=['GET', 'POST'])
# def explore_rings():
#     return render_template('ring.html')

# @app.route('/explore_chokers',methods=['GET', 'POST'])
# def explore_chokers():
#     return render_template('choker.html')

# @app.route('/explore_pendants',methods=['GET', 'POST'])
# def explore_pandants():
#     return render_template('pendant.html')

# @app.route('/explore_earrings',methods=['GET', 'POST'])
# def explore_earrings():
#     return render_template('earring.html')

# @app.route('/explore_bracelets',methods=['GET', 'POST'])
# def explore_bracelets():
#     return render_template('bracelet.html')

# @app.route('/buynow',methods=['POST'])
# def buynow():
    
#     #fetching data from form
    
#     price=int(request.form['price'])
#     quantity = int(request.form['counter'])
#     category = request.form['category']  
#     image_name = request.form['image_name']
    
#     #creating image path which will insert into the MySQL table
#     image_path=f'/static/{image_name}'  
    
#     #query to insert data into MySQL table
#     query="INSERT INTO cart (image_path,category,price,quantity) VALUES (%s,%s,%s,%s)"
#     cursor.execute(query,(image_path,category,price,quantity))
#     db.commit()
    
    
#     return redirect(request.referrer) 

# @app.route('/cart',methods=['POST','GET'])
# def cart():
#     query="SELECT * FROM cart"
#     cursor.execute(query)
#     data=cursor.fetchall()
    
#     total_sum_query = "SELECT SUM(price * quantity) AS total_sum FROM cart"
#     cursor.execute(total_sum_query)
#     total_sum_result = cursor.fetchone()
#     total_amount = total_sum_result[0]
    
#     return render_template('cart.html',data=data,total_amount=total_amount)


# @app.route('/remove_item/<int:id>',methods=['POST'])
# def remove_item(id):
#     query="DELETE FROM cart WHERE id=%s"
#     cursor.execute(query,(id,))    
#     db.commit()
#     return redirect(url_for('cart'))

# @app.route('/final_buy',methods=['POST','GET'])

# def final_buy():
#     query="TRUNCATE TABLE cart"
#     cursor.execute(query)
#     db.commit()
#     return render_template('mainpage.html')
    

if __name__ == '__main__':
    app.run(debug=True)


