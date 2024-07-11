import sqlite3

conn = sqlite3.connect('database v2.db')
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE IF NOT EXISTS images (
    type TEXT NOT NULL,
    answer TEXT NOT NULL,
    image BLOB NOT NULL
)
''')
conn.commit()

def convert_to_binary(filename):
    with open(filename, 'rb') as file:
        blob_data = file.read()
    return blob_data

def insert_image(type, answer, filename):
    with open(filename, 'rb') as file:
        blob_data = file.read()
    cursor.execute('''
    INSERT INTO images (type, answer, image)
    VALUES (?, ?, ?)
    ''', (type, answer, blob_data))
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

insert_image('country', 'argentina', 'gambar/argentina.png')
insert_image('country', 'australia', 'gambar/australia.png')
insert_image('country', 'brazil', 'gambar/brazil.png')
insert_image('country', 'canada', 'gambar/canada.png')
insert_image('country', 'india', 'gambar/india.png')
insert_image('country', 'italy', 'gambar/italy.png')
insert_image('country', 'japan', 'gambar/japan.png')
insert_image('country', 'kenya', 'gambar/kenya.png')
insert_image('country', 'nigeria', 'gambar/nigeria.png')
insert_image('country', 'sweden', 'gambar/sweden.png')
insert_image('country', 'canada', 'gambar/canada.png')

insert_image('captcha', 'x3fwf', 'gambar/x3fwf.png')
insert_image('captcha', 'dn5df', 'gambar/dn5df.png')
insert_image('captcha', 'gnc3n', 'gambar/gnc3n.png')
insert_image('captcha', '3bd8f', 'gambar/3bd8f.png')
insert_image('captcha', 'nbcgb', 'gambar/nbcgb.png')
insert_image('captcha', '2g783', 'gambar/2g783.png')
insert_image('captcha', '75pfw', 'gambar/75pfw.png')

conn.close()