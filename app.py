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
@app.route('/project_list', methods=['GET', 'POST'])
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

# Route to delete a project
@app.route('/delete_project/<int:project_id>', methods=['POST'])
def delete_project(project_id):
    # Connect to the database
    conn = connect_db()
    cursor = conn.cursor()

    # Execute the delete query
    query = "DELETE FROM projects WHERE id = %s"
    cursor.execute(query, (project_id,))

    # Commit and close the connection
    conn.commit()
    cursor.close()
    conn.close()

    # Redirect back to the project list after deletion
    return redirect(url_for('project_list'))

# Route to display the form to update the project status
@app.route('/update_status/<int:project_id>', methods=['GET', 'POST'])
def update_status(project_id):
    conn = connect_db()
    cursor = conn.cursor(dictionary=True)

    if request.method == 'POST':
        # Get the new status from the form
        new_status = request.form.get('status')

        # Update the status in the database
        query = "UPDATE projects SET status = %s WHERE id = %s"
        cursor.execute(query, (new_status, project_id))

        # Commit the transaction and close the connection
        conn.commit()
        cursor.close()
        conn.close()

        # Redirect back to the project list after updating
        return redirect(url_for('project_list'))

    # Fetch the project data to display in the form
    cursor.execute("SELECT * FROM projects WHERE id = %s", (project_id,))
    project = cursor.fetchone()

    cursor.close()
    conn.close()

    return render_template('update_status.html', project=project)


# # Route to handle project form submission
# @app.route('/submit_project', methods=['POST'])
# def submit_project():
#     conn = connect_db()
#     cursor = conn.cursor()

#     # Loop through each project card and extract the data
#     for i in range(1, 15):
#         project_tag = request.form.get(f'hidden_tag_{i}')
#         area = request.form.get(f'v0-area-{i}')
#         qty = request.form.get(f'v0-qty-{i}')
#         start = request.form.get(f'v0-start-{i}')
#         end = request.form.get(f'v0-end-{i}')

#         # Insert query to save the data in the database
#         query = """
#         INSERT INTO projects (project_tag, area, qty, start, end)
#         VALUES (%s, %s, %s, %s, %s)
#         """
#         cursor.execute(query, (project_tag, area, qty, start, end))

#     # Commit the transaction and close the connection
#     conn.commit()
#     cursor.close()
#     conn.close()

#     # Redirect to success or project list page
#     return redirect(url_for('project_list'))

# # Route to display project list with data from the database
# @app.route('/project_list_view')
# def project_list_view():
#     conn = connect_db()
#     cursor = conn.cursor(dictionary=True)

#     # Fetch data from the database
#     cursor.execute("SELECT * FROM projects")
#     projects = cursor.fetchall()

#     cursor.close()
#     conn.close()

#     # Pass the fetched data to the template
#     return render_template('project_list.html', projects=projects)

# # Route to view a specific project in detail
# @app.route('/project_view/<int:project_id>')
# def project_view(project_id):
#     conn = connect_db()
#     cursor = conn.cursor(dictionary=True)

#     # Fetch the specific project details
#     cursor.execute("SELECT * FROM projects WHERE id = %s", (project_id,))
#     project = cursor.fetchone()

#     cursor.close()
#     conn.close()

#     # Render the project view page with the project details
#     return render_template('project_view.html', project=project)

if __name__ == '__main__':
    app.run(debug=True)