import Router from "next/router";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ShareDb from "sharedb";
import ShareDbMongo from "sharedb-mongo";

const db = new ShareDbMongo(process.env.DATABASE, {
  mongoOptions: { useUnifiedTopology: true },
});

const share = new ShareDb({ db });

export default function Home({ id }) {
  useEffect(() => {
    Router.push(`/${id}`);
  });
}

export async function getServerSideProps(context) {
  const id = await createDoc();
  return {
    props: { id },
  };
}

async function createDoc() {
  const id = uuidv4();
  const connection = share.connect();
  const doc = connection.get("collection", id);

  return new Promise((resolve, reject) => {
    doc.create(
      {
        code:
          "// TITLE:\n// AUTHOR:\n\n" +
          'function setup() {\n  createCanvas(windowWidth, windowHeight);\n  print("Hello World!");\n}\n\n' +
          "function draw() {\n  background(220);\n  circle(mouseX, mouseY, 50);\n}\n",
      },
      (err) => {
        if (err) {
          reject(error);
        } else {
          resolve(id);
        }
      }
    );
  });
}
