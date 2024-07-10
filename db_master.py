import sqlite3

conn = sqlite3.connect('database.db')
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE IF NOT EXISTS images (
    answer TEXT NOT NULL,
    image BLOB NOT NULL
)
''')
conn.commit()

def convert_to_binary(filename):
    with open(filename, 'rb') as file:
        blob_data = file.read()
    return blob_data

def insert_image(answer, filename):
    with open(filename, 'rb') as file:
        blob_data = file.read()
    cursor.execute('''
    INSERT INTO images (answer, image)
    VALUES (?, ?)
    ''', (answer, blob_data))
    conn.commit()

def write_to_file(data, filename):
    with open(filename, 'wb') as file:
        file.write(data)

def read_image(name, output_filename):
    cursor.execute('''
    SELECT image FROM images WHERE answer = ?
    ''', (name,))
    blob_data = cursor.fetchone()[0]
    write_to_file(blob_data, output_filename)

insert_image('argentina', 'gambar/argentina.png')
insert_image('australia', 'gambar/australia.png')
insert_image('brazil', 'gambar/brazil.png')
insert_image('canada', 'gambar/canada.png')
insert_image('india', 'gambar/india.png')
insert_image('italy', 'gambar/italy.png')
insert_image('japan', 'gambar/japan.png')
insert_image('kenya', 'gambar/kenya.png')
insert_image('nigeria', 'gambar/nigeria.png')
insert_image('sweden', 'gambar/sweden.png')

conn.close()