from bson import ObjectId

from flask import Flask, request, Response
from pymongo import MongoClient
from io import BytesIO
from reportlab.pdfgen import canvas

from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
cors = CORS(app)

collection = MongoClient(
    "mongodb+srv://admin:admin@cluster0.gcthzkt.mongodb.net/?retryWrites=true&w=majority"
)["openmed"]["contextmap"]


@app.route("/")
def root():
    return jsonify({"status": "ok"})


@app.route("/report", methods=["GET"])
def report():
    # Fetch data from MongoDB
    uid = request.args["uid"]
    oid = ObjectId(uid)

    data = collection.find_one({"_id": oid})

    if data:
        print(data)
        pdf_buffer = BytesIO()
        p = canvas.Canvas(pdf_buffer)
        p.drawString(100, 750, "Data from MongoDB:")
        for i, object in enumerate(data["context"]):
            p.drawString(100, 730 - (i * 20), f"{i}: {object}")
        p.showPage()
        p.save()
        pdf_buffer.seek(0)

        return Response(
            pdf_buffer,
            content_type="application/pdf",
            headers={"Content-Disposition": "inline; filename=data.pdf"},
        )

    return jsonify({"Data not found in MongoDB": 404})


if __name__ == "__main__":
    app.run(debug=True)
