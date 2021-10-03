const fs = require('fs')
const program  = require('commander')
const p = require('path')
const { resolve } = require('path')
const homedir = require('os').homedir()
const path = process.env.HOME || homedir
const dbPath = p.join(path,'/.todo')
const db = {
    read(path=dbPath){
        return new Promise((resolve,reject)=>{
        fs.readFile(path,{flag:'a+'},(err,data)=>{
          if (err) {return reject(err)};
          let list
          try{
            list = JSON.parse(data.toString())
          }catch(error){
           list = []
          }
          resolve(list)  
        })
      })
    },
  write(list,path=dbPath){
      return new Promise((reslove,reject)=>{
        let words = JSON.stringify(list)
        fs.writeFile(path,words,err=>{
            if(err) {return reject(err)}
        })
      })
  }
}  

module.exports = db