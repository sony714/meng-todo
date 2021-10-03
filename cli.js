#!/usr/bin/env node
const program  = require('commander')
const api = require('./index.js')
const pkg = require('./package.json')
program
      .version(pkg.version)
program
  .command('add')
  .description('add task name')
  .action( async (args)=> {
     await api.add(args).then(()=>{
       console.log('添加成功')
     })
    });
program
  .command('clear')
  .description('clear task name')
  .action( async (args)=> {
     await api.clear().then(()=>{
        console.log('清理成功')
      })
    });
    program
    .command('show')
    .description('see all taskNames')
    .action( async ()=> {
        api.showAll()
      });
program.parse(process.argv);
