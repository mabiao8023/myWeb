import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { 
  LoginUsers, 
  Users , 
  classList,
  article,
  chapter,
  chapterList,
  freeList,
  bannerList,
  orderPayList,
  orderNotPayList,
  testList,
  questionList,
  answerList,
  testUserList} from './data/user';

let _Users = Users;
let _classList = classList;
let _article = article;
let _chapter = chapter;
let _chapterList = chapterList;
let _freeList = freeList;
let _bannerList = bannerList;
let _orderPayList = orderPayList;
let _orderNotPayList = orderNotPayList;
let _testList = testList;
let _questionList = questionList;
let _answerList = answerList;
let _testUserList = testUserList;
export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });
      
    //登录
    mock.onPost('/admin/login').reply(config => {
      let {name, pass} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === name && u.password === pass) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功', user }]);
          } else {
            resolve([200, { code: 500, msg: '账号或密码错误' }]);
          }
        }, 1000);
      });
    });

    //获取用户列表
    mock.onGet('/user/list').reply(config => {
      let {name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }]);
        }, 1000);
      });
    });


    //获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let {page, name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //删除用户
    mock.onGet('/user/remove').reply(config => {
      let { id } = config.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑用户
    mock.onGet('/user/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    //新增用户
    mock.onGet('/user/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Users.push({
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });

    // 获取课程列表
    mock.onGet('/class/list').reply(config => {
      let {title} = config.params;
      let mockClasses = _classList.filter(val => {
        if (title && val.title.indexOf(title) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            classList: mockClasses
          }]);
        }, 1000);
      });
    });

    // 编辑课程
    mock.onGet('/class/edit').reply(config => {
      let { id, title, img_url,desc,tag,sold, price } = config.params;
      _classList.some(c => {
        if (c.id === id) {
          c.title = title;
          c.img_url = img_url;
          c.desc = desc;
          c.tag = tag;
          c.sold = sold;
          c.prize = price;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      }); 
    });
    // 增加课程
    mock.onGet('/class/add').reply(config => {
      let { id, title, img_url,desc,tag,sold, price } = config.params;
      _classList.push({
          id:4, 
          title:title,
          img_url:img_url,
          desc:desc,
          tag:tag,
          sold:sold,
          price:price
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功',
            data:{
              id:4
            }
          }]);
        }, 500);
      });
    });
    // 删除课程
    mock.onGet('/class/remove').reply(config => {
      let { id } = config.params.id;
      let index;
      _classList.forEach( (c,i) => {
        if( c.id == id ){
          index = i;
          return false;
        }
      } );
      _classList.splice(index,1);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功',
            data:{
              id:4
            }
          }]);
        }, 500);
      });
    });

    // 获取课程首页配置
    mock.onGet('/class/classIndex').reply(config => {
      let id = config.params.id;
      // 随机生成一个传给前端
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功',
            data:{
              article:_article
            }
          }]);
        }, 500);
      });
    } );
    // 增加或者修改课程文章配置
    mock.onGet('/class/addClassDetail').reply(config => {
      // let id = config.params.id;
      _article = config.params.article;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '添加成功',
            data:{
              article:_article
            }
          }]);
        }, 500);
      });
    });


    // 获取章节列表
    mock.onGet('/class/getClassChapter').reply(config => {
      let id = config.params.classId;
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '添加成功',
              data:{
                chapterList:_chapter
              }
            }]);
          }, 500);
        });
    });

    // 修改课程章节信息
    mock.onGet('/class/editClassChapter').reply(config => {
      let { id,classId,title,desc,chapter_id } = config.params;
      _chapter.forEach( val => {
        if(val.id == id){
          val.title = title;
          val.desc = desc;
          val.chapter_id = chapter_id;
        }
      } );
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '修改成功',
              data:{
                text:'修改成功'
              }
            }]);
          }, 500);
      });
    });

    // 新增课程章节
    mock.onGet('/class/addClassChapter').reply(config => {
      let { id,classId,title,desc } = config.params;
      _chapter.push({
         id:id + 1,
         classId:classId,
         title:title,
         desc:desc 
      })
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '添加成功',
              data:{
                text:'添加成功'
              }
            }]);
          }, 500);
      });
    });

    // 删除课程章节信息
    mock.onGet('/class/removeClassChapter').reply(config => {
      let {id,classId} = config.params;
      let index;
      _chapter.forEach( (val,i) => {
        if(val.id == id){
          index = i;
        }
      } );
      _chapter.splice(index,1);
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '删除成功',
              data:{
                text:'删除成功'
              }
            }]);
          }, 500);
      });
    });

    // 获取章节内具体信息列表
    mock.onGet('/class/getClassChapterList').reply(config => {
      let id = config.params.id;
      let classId = config.params.classId;
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '添加成功',
              data:{
                classChapterList:_chapterList
              }
            }]);
          }, 500);
        });
    });

    // 修改章节类二级信息
    mock.onGet('/class/editClassChapterList').reply(config => {
      let { id,type,title,desc,img,video,article } = config.params;
      _chapterList.forEach( val => {
        if(val.id == id){
          val.type = type;
          val.title = title;
          val.desc = desc;
          val.img = img;
          val.video = video;
          val.article = article;
        }
      } );
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '修改成功',
              data:{
                text:'修改成功'
              }
            }]);
          }, 500);
      });
    });

    // 新增课程章节
    mock.onGet('/class/addClassChapterList').reply(config => {
      let { id,type,title,desc,img,video,article } = config.params;
      _chapterList.push({
         id:id + 1,
         type:type,
         title:title,
         desc:desc,
         img:img,
         video:video,
         article:article
      })
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '添加成功',
              data:{
                text:'添加成功'
              }
            }]);
          }, 500);
      });
    });

    // 删除课程章节信息
    mock.onGet('/class/removeClassChapterList').reply(config => {
      let {id,classId} = config.params;
      let index;
      _chapterList.forEach( (val,i) => {
        if(val.id == id){
          index = i;
        }
      } );
      _chapterList.splice(index,1);
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '删除成功',
              data:{
                text:'删除成功'
              }
            }]);
          }, 500);
      });
    });


    // 获取免费列表
    mock.onGet('/class/getClassFreeList').reply(config => {
      let id = config.params.id;
      let classId = config.params.classId;
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '添加成功',
              data:{
                freeList:_freeList
              }
            }]);
          }, 500);
        });
    });

    // 修改免费信息
    mock.onGet('/class/editClassFreeList').reply(config => {
      let { id,type,title,desc,img,video,article } = config.params;
      _freeList.forEach( val => {
        if(val.id == id){
          val.type = type;
          val.title = title;
          val.desc = desc;
          val.img = img;
          val.video = video;
          val.article = article;
        }
      } );
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '修改成功',
              data:{
                text:'修改成功'
              }
            }]);
          }, 500);
      });
    });

    // 新增免费
    mock.onGet('/class/addClassFreeList').reply(config => {
      let { id,type,title,desc,img,video,article } = config.params;
      _freeList.push({
         id:id + 1,
         type:type,
         title:title,
         desc:desc,
         img:img,
         video:video,
         article:article
      })
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '添加成功',
              data:{
                text:'添加成功'
              }
            }]);
          }, 500);
      });
    });

    // 删除免费
    mock.onGet('/class/removeClassFreeList').reply(config => {
      let {id,classId} = config.params;
      let index;
      _freeList.forEach( (val,i) => {
        if(val.id == id){
          index = i;
        }
      } );
      _freeList.splice(index,1);
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '删除成功',
              data:{
                text:'删除成功'
              }
            }]);
          }, 500);
      });
    });
  

    // 获取轮播图列表
    
    mock.onGet('/class/getBannerList').reply(config => {
      return new Promise((resolve, reject) =>{
        setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '请求成功',
              data:{
                bannerList:_bannerList
              }
            }]);
          }, 500);
      })
    });

    // 编辑轮播图
    mock.onGet('/class/editBannerList').reply(config => {
      let { id,title,img,link } = config.params;
      _bannerList.forEach( val => {
        if(val.id == id){
          val.title = title;
          val.img = img;
          val.video = link;
        }
      } );
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '修改成功',
              data:{
                text:'修改成功'
              }
            }]);
          }, 500);
      });

    });

    // 删除轮播图
    mock.onGet('/class/removeBannerList').reply(config => {
      let { id,title,img,link } = config.params;
      let index;
      _bannerList.forEach( (val,i) => {
        if(val.id == id){
          index = i;
        }
      } );
      _bannerList.splice(index,1);
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '删除成功',
              data:{
                text:'删除成功'
              }
            }]);
          }, 500);
      });
    });

    // 新增轮播图
    mock.onGet('/class/addBannerList').reply(config => {
      let { id,title,img,link } = config.params;
      _bannerList.push({
         id:id + 1,
         title:title,
         img:img,
         link:link
      })
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '添加成功',
              data:{
                text:'添加成功'
              }
            }]);
          }, 500);
      });
    });

    // 获取支付成功订单信息
    mock.onGet('/order/payList').reply(config => {
      // 用与查询的参数
      let {page, name} = config.params;
      // 过滤筛选的原则
      let mockOrderPayList = _orderPayList.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockOrderPayList.length;
      // 分页处理
      mockOrderPayList = mockOrderPayList.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            orderList: mockOrderPayList
          }]);
        }, 1000);
      });
    });


    // 获取测试列表
  
    mock.onGet('/class/getTestList').reply(config => {
      return new Promise((resolve, reject) =>{
        setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '请求成功',
              data:{
                testList:_testList
              }
            }]);
          }, 500);
      })
    });

    // 编辑轮播图
    mock.onGet('/class/editTestList').reply(config => {
      let { id,title,img,desc,testNums } = config.params;
      _testList.forEach( val => {
        if(val.id == id){
          val.title = title;
          val.img = img;
          val.desc = desc;
          val.testNums = testNums;
        }
      });
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '修改成功',
              data:{
                text:'修改成功'
              }
            }]);
          }, 500);
      });

    });

    // 删除测试列表
    mock.onGet('/class/removeTestList').reply(config => {
      let  id  = config.params.id;
      let index;
      _testList.forEach( (val,i) => {
        if(val.id == id){
          index = i;
        }
      } );
      _testList.splice(index,1);
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '删除成功',
              data:{
                text:'删除成功'
              }
            }]);
          }, 500);
      });
    });

    // 新增测试列表
    mock.onGet('/class/addTestList').reply(config => {
      let { id,title,img,desc,testNums } = config.params;
      _testList.push({
         id:id + 1,
         title:title,
         img:img,
         desc:desc,
         testNums:testNums
      })
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '添加成功',
              data:{
                text:'添加成功'
              }
            }]);
          }, 500);
      });
    });

    // 获取测试问题列表
  
    mock.onGet('/class/getQuestionList').reply(config => {
      return new Promise((resolve, reject) =>{
        setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '请求成功',
              data:{
                questionList:_questionList
              }
            }]);
          }, 500);
      })
    });

    // 编辑测试问题列表
    mock.onGet('/class/editQuestionList').reply(config => {
      let { id,title,img,answers } = config.params;
      console.log(answers)
      _questionList.forEach( val => {
        if(val.id == id){
          val.title = title;
          val.img = img;
          val.answers = answers;
        }
      });
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '修改成功',
              data:{
                text:'修改成功'
              }
            }]);
          }, 500);
      });

    });

    // 删除测试问题列表
    mock.onGet('/class/removeQuestionList').reply(config => {
      let  id  = config.params.id;
      let index;
      _questionList.forEach( (val,i) => {
        if(val.id == id){
          index = i;
        }
      } );
      _questionList.splice(index,1);
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '删除成功',
              data:{
                text:'删除成功'
              }
            }]);
          }, 500);
      });
    });

    // 新增测试问题列表
    mock.onGet('/class/addQuestionList').reply(config => {
      let { id,title,img,answers } = config.params;
      _questionList.push({
         id:id + 1,
         title:title,
         img:img,
         answers:answers
      })
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '添加成功',
              data:{
                text:'添加成功'
              }
            }]);
          }, 500);
      });
    });



    // 获取测试问题答案列表
  
    mock.onGet('/class/getAnswerList').reply(config => {
      return new Promise((resolve, reject) =>{
        setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '请求成功',
              data:{
                answerList:_answerList
              }
            }]);
          }, 500);
      })
    });

    // 编辑测试问题答案列表
    mock.onGet('/class/editAnswerList').reply(config => {
      let { id,title,answerImg } = config.params;
      console.log(answers)
      _answerList.forEach( val => {
        if(val.id == id){
          val.title = title;
          val.answerImg = answerImg;
        }
      });
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '修改成功',
              data:{
                text:'修改成功'
              }
            }]);
          }, 500);
      });

    });

    // 删除测试问题列表
    mock.onGet('/class/removeAnswerList').reply(config => {
      let  id  = config.params.id;
      let index;
      _answerList.forEach( (val,i) => {
        if(val.id == id){
          index = i;
        }
      } );
      _answerList.splice(index,1);
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '删除成功',
              data:{
                text:'删除成功'
              }
            }]);
          }, 500);
      });
    });

    // 新增测试问题列表
    mock.onGet('/class/addAnswerList').reply(config => {
      let { id,title,answerImg } = config.params;
      _answerList.push({
         id:id + 1,
         title:title,
         answerImg:answerImg
      })
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '添加成功',
              data:{
                text:'添加成功'
              }
            }]);
          }, 500);
      });
    });


    // 获取测试成功用户信息,查询的作用
    mock.onGet('/class/getTestUserList').reply(config => {
      // 用与查询的参数
      let {page, name} = config.params;
      // 过滤筛选的原则
      let mockOrderPayList = _testUserList.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockOrderPayList.length;
      // 分页处理
      mockOrderPayList = mockOrderPayList.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            testUserList: mockOrderPayList
          }]);
        }, 1000);
      });
    });
  }
};