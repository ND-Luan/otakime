
from flask import Flask,Blueprint,render_template,request,redirect,session,url_for

from flask_wtf import FlaskForm
from flask_wtf.file import FileRequired
from wtforms import StringField,MultipleFileField,DateField,SelectField,FileField
from wtforms.validators import DataRequired,InputRequired

from api.firebase import db,storage,user
from api.model import getManga

from datetime import datetime
import os
admin = Blueprint('admin', __name__)

def reload(isWant,manga):
    print("Dang commit toi github")
    with open("historyLogs.txt","a", encoding="utf-8") as file:
        time = datetime.now()
        file.writelines(f"{time} // {manga} - {isWant} \n")
    os.system("git add *")
    print("Git add")
    os.system(f"git commit -m \"{isWant} {manga}\"")
    print("git commit")
    os.system("git push")
    print("push xong!")

class CreateValidate(FlaskForm):
    manga = StringField("*Tên tiếng Nhật bằng chữ Latin như: Ore wo Aishisugiteru Shugoshin wa!, Asmodeus wa Akiramenai,...", validators=[InputRequired()])
    nameManga = StringField("*Tên tiếng Việt của Manga", validators=[InputRequired()])
    author = StringField("author", validators=[InputRequired()])
    otherName = StringField("otherName",validators=[InputRequired()])
    tags = StringField("*Ở mỗi thể loại thì phải cách nhau bằng khoảng trắng",validators=[InputRequired()])
    updateAt = DateField("updateAt",validators=[InputRequired()])
    description = StringField("description", validators=[InputRequired()])
    imgIndex = FileField(label="*Ảnh Index có kích thước 1000 x 1574")
    imgMain = FileField(label="*Ảnh Main có kích thước 1471 x 2018")
    imgCover = FileField("*Ảnh Cover có kích thước 1920 x 1652")
    chapter = StringField("chapter", validators=[InputRequired()])
    imgChapter = MultipleFileField('imgChapter',validators=[DataRequired()])

class updateChapterValidate(FlaskForm):
    DB = getManga()
    _list = []
    for item in DB:
        _list.append(item.keyName)
    chapter = StringField("chapter", validators=[InputRequired()])
    imgChapter = MultipleFileField('imgChapter',validators=[DataRequired()])
    selectManga = SelectField('selectedManga', choices= _list)

class deleteChapterValidate(FlaskForm):
    DB = getManga()
    _list = []
    for item in DB:
        _list.append(item.keyName)

    selectManga = SelectField(validators=[DataRequired()], choices=_list)
    chapter = StringField(validators=[DataRequired()])

class deleteMangaValidate(FlaskForm):
    DB = getManga()
    _list = []
    for item in DB:
        _list.append(item.keyName)
    manga = SelectField("nameManga", choices=_list)
@admin.route('/admin' ,methods =['GET','POST'])
def login():
    title= "Otakime - Login"
    usernameRoot = "potato"
    passwordRoot = "potato"
    if request.method == 'POST':

        username = request.form.get('username')
        password = request.form.get('password')
        if username == usernameRoot and password == passwordRoot:
            session["name"] = username
            print("Login Completed")
            return redirect('/admin/create') 

    return render_template('admin/login.html',title = title)

@admin.route("/logout")
def logtout():
    session.pop('name',None)
    return redirect('/admin')

@admin.route('/admin/create', methods = ['GET','POST'])
def create():

    if not session.get("name"):
        return redirect("/admin")

    form  = CreateValidate()

    if form.is_submitted():
        manga = form.manga.data
        nameManga = form.nameManga.data
        author = form.author.data
        otherName = form.otherName.data
        tags = form.tags.data.split(",")
        updateAt = form.updateAt.data.strftime("%d/%m/%Y")
        description = form.description.data
        imgIndex = form.imgIndex.data
        imgMain = form.imgMain.data
        imgCover = form.imgCover.data
        chapter = form.chapter.data
        imgChapter = form.imgChapter.data


        if len(chapter) == 2:
            pass
        else:
            if chapter[0] not in "0":
                chapter = "0" + chapter
        #check img index co dc add khong?
        print(imgIndex)
        if imgIndex.filename == '':
            print("img index chua dc them")
            dbimgIndex= ""
        else:
            print(manga) 
            print(imgIndex)
            storage.child("manga").child(manga).child("logo").child(imgIndex.filename).put(imgIndex,user['idToken'])
            dbimgIndex = storage.child("manga").child(manga).child("logo").child(imgIndex.filename).get_url(user['idToken'])
            print("Add img index")
        #add img banner va cover vao trong storage firebase
        storage.child("manga").child(manga).child("logo").child(imgMain.filename).put(imgMain,user['idToken'])
        print("Add img Main vao Storage")
        storage.child("manga").child(manga).child("logo").child(imgCover.filename).put(imgCover,user['idToken'])
        print("Add img Cover vao Storage")

        dbimgMain = storage.child("manga").child(manga).child("logo").child(imgMain.filename).get_url(user['idToken'])
        dbimgCover = storage.child("manga").child(manga).child("logo").child(imgCover.filename).get_url(user['idToken'])

        #add img chapter vao trong storage firebase
        for item in imgChapter:
            storage.child("manga").child(manga).child("chapter").child(f"{chapter}").child(item.filename).put(item, user['idToken'])
            print("Add img Chapter vào Storage: ",item)

         #add json manga realtime database
        db.child("manga").child(manga).update({
                "nameManga":nameManga,
                "author":author,
                "otherName":otherName,
                "tags": tags,
                "updateAt":updateAt,
                "description":description,
                "imgIndex":dbimgIndex,
                "imgMain":dbimgMain,
                "imgCover":dbimgCover,
            })
        print("Add manga vao realtime")
        db.child("manga").child(manga).child("chapter").update({
                f"Chap {chapter}":[storage.child("manga").child(manga).child("chapter").child(f"{chapter}").child(item.filename).get_url(user['idToken']) for item in imgChapter]
            })  
        print("Add img chapter vao realtime")
       
        reload("Create",manga)

        return render_template("admin/create.html", form = form, success = True)
    else:
        print("Submit Yet!")
    title= "Otakime - Admin - Create"
    return render_template(
        'admin/create.html',
        title = title,
        form = form
    
    )

@admin.route('/admin/updatechapter',methods = ['GET','POST'])
def updateChapter():
    if not session.get("name"):
        return redirect("/admin")

    form = updateChapterValidate()
    
    title= "Otakime - Admin - Update chapter"

    if form.is_submitted():
        selectManga = form.selectManga.data
        imgChapter = form.imgChapter.data
        chapter = form.chapter.data
        chapter = str(chapter)
        if len(chapter) == 2:
            pass
        else:
            if chapter[0] not in "0":
                chapter = "0" + chapter
        for item in imgChapter:
            storage.child("manga").child(selectManga).child("chapter").child(f"{chapter}").child(item.filename).put(item, user['idToken'])
            print("Add img chapter vo Storage: ",item)

        db.child("manga").child(selectManga).child("chapter").update({
            f"Chap {chapter}": [storage.child("manga").child(selectManga).child("chapter").child(f"{chapter}").child(item.filename).get_url(user['idToken']) for item in imgChapter]
        })
        print("Add img chapter vo Realtime")
        reload("Update chapter",selectManga)
        return render_template(
            'admin/updateChapter.html',
            form=form,
            success = True

        )
    return render_template(
    'admin/updateChapter.html',
    form=form,


    )   

@admin.route('/admin/deletechapter', methods = ['GET','POST'])
def deleteChapter():
    if not session.get("name"):
        return redirect("/admin")
    title= "Otakime - Admin - Delete chapter"
    form = deleteChapterValidate()
    if form.is_submitted():
        selectManga = form.selectManga.data
        chapter = form.chapter.data
        listStorageChapter = storage.list_files(f"manga/{selectManga}/chapter/{chapter}/")  

        for item in listStorageChapter:
            split = item.name
            storage.delete(split, user['idToken'])
            print(f"Xoa img chapter {selectManga} ra khoi Storage")
            
        db.child("manga").child(selectManga).child("chapter").child(f"Chap {chapter}").remove(user['idToken'])
        print(f"Xoa img chapter {selectManga} ra khoi Realtime")
        reload("Delelte chapter",selectManga)
        return render_template(
            'admin/deleteChapter.html',
            form = form,
            success = True
        )
    return render_template(
        'admin/deleteChapter.html',
            form = form
    )

@admin.route('/admin/deletemanga', methods= ['GET','POST'])
def deleteManga():
    if not session.get("name"):
        return redirect("/admin")

    form = deleteMangaValidate()
    if form.is_submitted():
        manga = form.manga.data
        listStorageLogo = storage.list_files(f"manga/{manga}/logo/")
        for item in listStorageLogo:
            split = item.name
            storage.delete(split, user['idToken'])
            print(f"Xoa {manga}/logo ra khoi Storage")


        listStorageChapter = storage.list_files(f"manga/{manga}/chapter/")            
        for item in listStorageChapter:
            split = item.name
            storage.delete(split, user['idToken'])
            print(f"Xoa {manga}/chapter ra khoi Storage")
            
        db.child("manga").child(manga).remove(user['idToken'])
        print(f"Xoa {manga} ra khoi Realtime")
        reload("Delelte manga",manga)
        return render_template('admin/deleteManga.html',form = form,success = True) 
    title= "Otakime - Admin - Delete manga"
    return render_template(
        'admin/deleteManga.html',
        form = form
       
    )


