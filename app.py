from flask import Flask, render_template, request, redirect, url_for
import mysql.connector

app = Flask(__name__, template_folder='template')

@app.route('/', methods=['GET', 'POST'])
def lead_gen():
    return render_template('lead-gen.html')

@app.route('/customer', methods=['GET', 'POST'])
def customer():
    return render_template('customer.html')

# Project page
@app.route('/project', methods=['GET', 'POST'])
def project():
    return render_template('project.html')

@app.route('/project_view', methods=['GET', 'POST'])
def project_view():
    return render_template('project_view.html')

@app.route('/profession', methods=['GET', 'POST'])
def profession():
    return render_template('profession.html')

@app.route('/occupation', methods=['GET', 'POST'])
def occupation():
    return render_template('occupation.html')

@app.route('/budget', methods=['GET', 'POST'])
def budget():
    return render_template('budget.html')

@app.route('/requirement', methods=['GET', 'POST'])
def requirement():
    return render_template('requirement.html')

db_config = {
    'user': 'root',
    'password': '123456',
    'host': 'localhost',
    'database': 'compactbuilder_db'
}

# Connect to the MySQL database
def connect_db():
    return mysql.connector.connect(**db_config)

# Route for the project form submission
@app.route('/submit_project', methods=['GET', 'POST'])
def project_form():
    if request.method == 'POST':
        # Fetch form data
        project_name = request.form['pl-name']
        total_area = request.form['pl-area']
        address = request.form['pl-address']
        description = request.form['pl-desc']
        status = request.form['pl-status']

        # Connect to the database and insert the form data
        conn = connect_db()
        cursor = conn.cursor()

        # Insert query
        query = """
        INSERT INTO projects (project_name, total_area, address, description, status)
        VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(query, (project_name, total_area, address, description, status))

        # Commit and close the connection
        conn.commit()
        cursor.close()
        conn.close()

        return redirect(url_for('success'))

    return render_template('project_form.html')

# Route for the success page
@app.route('/success')
def success():
    return 'Project created successfully!'

# Route to display project list with data from database
@app.route('/project_list', methods=['GET'])
def project_list():
    conn = connect_db()
    cursor = conn.cursor(dictionary=True)  # Fetch rows as dictionaries for easy access

    # Fetch data from the database
    cursor.execute("SELECT * FROM projects")
    projects = cursor.fetchall()

    cursor.close()
    conn.close()

    # Pass the fetched data to the template
    return render_template('project_list.html', projects=projects)

if __name__ == '__main__':
    app.run(debug=True)
