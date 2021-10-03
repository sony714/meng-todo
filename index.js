  const db = require('./db')
  const inquirer = require('inquirer')
  
  module.exports.add = async(title)=>{
     // 创建文件
     let list =await db.read()
     //添加文件内容
     list.push({title,done:false})
     //写入文件
     db.write(list)
}

module.exports.clear = async()=>{
  //写入文件
   await db.write([])
}

module.exports.showAll = async()=>{
  //写入文件
  let list = await db.read()
  inquirer.prompt([
    {
        type:"list",
        message:"请选择一个选项：",
        name:"index",
        choices:[{name:'退出',value:'-1'},...list.map((task,index)=>{
          return {name:`${task.done?'[√]':'[]'} ${task.title}`,value:index}
        }),{value:'-2',name:'创建任务'}]
    }
]).then(answer=>{
   let index= answer.index
   if(index == -2){
     inquirer.prompt([
      {
        type:"input",
        message:"请输入任务名称",
        name:"title",
        default:'学前端'
       }
     ]).then(answer=>{
       list.push({
        title:answer.title,
        done:false})
       db.write(list)
       console.log('创建成功')
     })
   }else if(index>=0){
      inquirer.prompt([
        {
          type:'list',
          message:'请选择您的操作',
          name:'action',
          choices:[
            {name:'退出',action:'quit'},
            {name:'修改标题',action:'updateTitle'},
            {name:'已完成',action:'fish'},
            {name:'删除',action:'remove'}
          ]
        }
      ]).then((answer)=>{
        switch(answer.action){
          case '退出':
          break;
          case '修改标题':
          inquirer.prompt([
            {
              type:'input',
              message:'请输入新标题',
              name:'title'
            }
          ]).then(answer=>{
            list[index].title = answer.title
            db.write(list)
          })
          break;
          case '已完成':
            list[index].done = true
            db.write(list)
          break;
          case '删除':
            list.splice(index,1)
            db.write(list)
            console.log('删除成功')
          break;
        }
      })
   }
});
}


