from email.policy import default
from flask import Flask,Blueprint,render_template
from model import getManga,Manga
client = Blueprint('client', __name__)

@client.route('/')
def home():


    kanjoHome = {}
    chinkoHome = {}
    toaruHome = {}
    mizoreHome = {}


    for item in getManga():
        if item.keyName == "Kawaii Kanojo-chan":
            kanjoHome.update({
                "keyName": item.keyName,
                "imgIndex": item.imgIndex,
            })
        if item.keyName == "Ore no Kokan wa Bishoujo Datta no ka":
            chinkoHome.update({
                "keyName": item.keyName,
                "imgIndex": item.imgIndex,
            })
        if item.keyName == "Toaru Meoto no Nichijou":
            toaruHome.update({
                "keyName": item.keyName,
                "imgIndex": item.imgIndex,
            })
        if item.keyName == "Tokedase Mizore-chan":
            mizoreHome.update({
                "keyName": item.keyName,
                "imgIndex": item.imgIndex,
            })

    srcLogo = "https://firebasestorage.googleapis.com/v0/b/otakime-dc208.appspot.com/o/logo%2Fotakime_logo.png?alt=media&token=1d3a37bb-fd34-42fd-be41-c9cf1424f472"
    return render_template(
        'client/home.html',
        srcLogo = srcLogo,
        dbKanjo = kanjoHome,
        dbToaru = toaruHome,
        dbMizore = mizoreHome,
        dbChinko = chinkoHome,
        )

@client.route('/about')
def about():
    return render_template('client/about.html')

@client.route('/manga')
def manga():
    _manga = {}
    index=0
    for item in getManga():
        _manga.update({
            index:{
            "keyName":item.keyName,
            "nameManga":item.nameManga,
            "imgMain":item.imgMain,
            "tags" : ", ".join(item.tags)
            }
        })
        index+=1

    return render_template(
            'client/manga.html',
            db = _manga
        )

@client.route('/<url>')
def detailManga(url):

    chapterFirst =""
    for item in getManga():
        if url == item.keyName.lower().replace(" ","-"):
            index = list(item.chapter)[0].lower().replace('chap ','')
            print(index)
            return render_template(
                'client/detailManga.html',
                indexFirst = index,
                db = item,
                dbChapter = item.chapter.keys()
            )

    return render_template('404.html')

@client.route('/<url>/<urlChapter>')
def chapterManga(url,urlChapter):
    img = []
    _dict = {}
    chapterPrevious =""
    chapterNext = ""
    chapterPresent =""
    for item in getManga():

        if url == item.keyName.lower().replace(" ","-"):
            for keyChapter,valueIMG in item.chapter.items():
                if  keyChapter.lower().replace('chap ','') == urlChapter:
                    chapterPresent = keyChapter
                    img.append(valueIMG)

                    try:
                        _listChapter = [i for i in item.chapter]
                        indexPresent = _listChapter.index(chapterPresent)
                        chapterPrevious = _listChapter[indexPresent - 1 ]

                        chapterNext = _listChapter[indexPresent + 1 ] 
                    except IndexError:
                        chapterNext =""


            _dict.update({
                "keyName":item.keyName,
                "nameManga": item.nameManga,
                "chapterDropdown": item.chapter.keys(),
                "chapterPrevious": chapterPrevious,
                "chapterNext": chapterNext
            })


    return render_template(
        'client/chapterManga.html',

        db = _dict,
        dbIMG = img,
        chapterPresent = chapterPresent
        )

