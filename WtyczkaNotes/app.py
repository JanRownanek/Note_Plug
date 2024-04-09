from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('note.html')

@app.route('/save_note', methods=['POST'])
def save_note():
    note = request.form['note']
    # Tutaj możesz dodać kod do zapisu notatki, np. do pliku lub bazy danych
    return "Note saved successfully"

if __name__ == '__main__':
    app.run(debug=True)
