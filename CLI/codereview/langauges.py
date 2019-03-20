def get_langauge_from_extention(ext):
    if ext in languages:
        print("Detected language:", languages[ext])
        return languages[ext]
    raise ValueError("File type " + ext + " is not supported yet.")

languages = {
    'js': 'javascript',
    'py': 'python'
}