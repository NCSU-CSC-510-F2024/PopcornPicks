# Use the official Python image as the base image
FROM python:3.12

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file into the working directory
COPY requirements.txt requirements.txt

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

#COPY PIPFILES
COPY Pipfile Pipfile.lock /app/
#RUN THESE COMMANDS 
RUN pip install pipenv && pipenv install --system

# Copy the rest of the application code into the working directory
COPY . .

# Expose the port that the Flask app will run on
EXPOSE 5000

# Set environment variables (optional)
#ENV FLASK_APP=app.py
#ENV FLASK_RUN_HOST=0.0.0.0

# Run the application
#CMD ["flask", "run"]