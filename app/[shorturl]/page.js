// import { redirect } from 'next/navigation'
// import mongoose from 'mongoose'

// const connect = async () => {
//   if (mongoose.connections[0].readyState) return
//   await mongoose.connect(process.env.MONGODB_URI, {
//     dbName: "urlShortenerDB"
//   })
// }

// const urlSchema = new mongoose.Schema({
//   longUrl: String,
//   shortName: { type: String, unique: true }
// })

// const Url = mongoose.models.Url || mongoose.model('Url', urlSchema)

// export default async function Page({ params }) {
//   await connect()
//   const { shorturl } = params.shorturl

//   const record = await Url.findOne({ shortName: shorturl })

// if (!record) {
//     redirect('/');
//     return null;
// }

// redirect(record.longUrl)
// }

import { redirect } from 'next/navigation'
import mongoose from 'mongoose'

const connect = async () => {
  if (mongoose.connections[0].readyState) return
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "urlShortenerDB"
  })
}

const urlSchema = new mongoose.Schema({
  longUrl: String,
  shortName: { type: String, unique: true }
})

const Url = mongoose.models.Url || mongoose.model('Url', urlSchema)

export default async function Page({ params }) {
  await connect()
  
  // Access params directly, don't destructure
  const shorturl = params.shorturl;
  console.log("➡️ shorturl param:", shorturl)

  // Find the record based on the short URL
  const record = await Url.findOne({ shortName: shorturl })
  console.log("🔎 Found record in DB:", record) 

  if (!record) {
    console.log("❌ No record found, redirecting to /")
    // Redirect to home if the short URL is not found
    redirect('/');
    return null;
  }

  console.log("✅ Redirecting to:", record.longUrl)
  // Redirect to the long URL if the record is found
  redirect(record.longUrl)
}
