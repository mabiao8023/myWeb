import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
];

// 用户信息
const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

// 课程列表
const classList = [];

for (let i = 0; i < 3; i++) {
  classList.push(Mock.mock({
    id: Mock.Random.increment(),
    title: Mock.Random.ctitle(),
    img_url: Mock.Random.image('200x100','#ffffff'),
    tag:Mock.Random.cword(3),
    desc:Mock.Random.cword(10),
    price: Mock.Random.integer(1, 200),
    sold:Mock.Random.integer(1000,100000)
  }));
}

// 课程主页详情
const article = [];

for (let i = 0; i < 3; i++) {
  article.push(Mock.mock({
    title: Mock.Random.ctitle(),
    img_url: Mock.Random.image('200x100','#ffffff'),
    content:Mock.Random.cparagraph(),
    link:Mock.Random.url('http'),
  }));
}
// 课程章节

const chapter = [];

for (let i = 0; i < 3; i++) {
  chapter.push(Mock.mock({
    id:Mock.Random.increment(),
    classId:1,
    chapter_id:Mock.Random.increment(), 
    title: Mock.Random.ctitle(),
    desc:Mock.Random.cparagraph(),
  }));
}

// 章节详情列表

const chapterList = [];

for (let i = 0; i < 3; i++){
  chapterList.push(Mock.mock({
    id:Mock.Random.increment(),
    'resource_type|0-1':0,
    title:Mock.Random.ctitle(5),
    desc:Mock.Random.cword(10),
    img_url:Mock.Random.image('200x100','#ffffff'),
    lesson_no:Mock.Random.increment(),
    resource:{
        media_url:Mock.Random.url('http'),
        content:Mock.Random.cparagraph(),
    },
    // img:Mock.Random.image('200x100','#ffffff'),
    // video:Mock.Random.url('http'),
    // article:Mock.Random.cparagraph(),
  }))
}

// 章节详情列表

const freeList = [];

for (let i = 0; i < 3; i++){
  freeList.push(Mock.mock({
    id:Mock.Random.increment(),
    'resource_type|0-1':0,
    sort:Mock.Random.increment(),
    title:Mock.Random.ctitle(),
    desc:Mock.Random.cword(10),
    img:Mock.Random.image('200x100','#ffffff'),
    resource:{
        id:1,
        media_url:'',
        media_time:'',
        size:'',
        content:'',
    }
  }))
}

// 轮播图列表

const bannerList = [];

for (let i = 0; i < 3; i++){
  bannerList.push(Mock.mock({
    id:Mock.Random.increment(),
    title:Mock.Random.ctitle(),
    img:Mock.Random.image('200x100','#ffffff'),
    link:Mock.Random.url('http'),
  }))
}

// 已完成订单统计

const orderPayList = [];

for (let i = 0; i < 86; i++){
  orderPayList.push(Mock.mock({
    id:Mock.Random.increment(),
    userId:Mock.Random.increment(),
    userName:Mock.Random.cname(),
    classId:Mock.Random.increment(),
    classTitle:Mock.Random.ctitle(),
    orderTime:Mock.Random.datetime(),
    channel:Mock.Random.name(),
  }))
}

// 未支付订单统计

const orderNotPayList = [];

for (let i = 0; i < 86; i++){
  orderNotPayList.push(Mock.mock({
    id:Mock.Random.increment(),
    userId:Mock.Random.increment(),
    userName:Mock.Random.cname(),
    classId:Mock.Random.increment(),
    classTitle:Mock.Random.ctitle(),
    orderTime:Mock.Random.datetime(),
    channel:Mock.Random.name(),
  }))
}


// 测试类列表数据

const testList = [];

for (let i = 0; i < 3; i++){
  testList.push(Mock.mock({
    id:Mock.Random.increment(),
    title:Mock.Random.ctitle(),
    img:Mock.Random.image('200x100','#ffffff'),
    desc:Mock.Random.cparagraph(),
    testNums:Mock.Random.integer(1000,100000)
  }))
}

// 测试问题列表

const questionList = [];

for (let i = 0; i < 3; i++){
  questionList.push(Mock.mock({
    id:Mock.Random.increment(),
    title:Mock.Random.ctitle(),
    img:Mock.Random.image('200x100','#ffffff'),
    answers:['是','不是'],
  }))
}

const answerList = [];

for (let i = 0; i < 3; i++){
    answerList.push(Mock.mock({
        id:Mock.Random.increment(),
        title:Mock.Random.ctitle(),
        answerImg:Mock.Random.image('640x320','#ffffff'),
    }))
}


// 已完成订单统计

const testUserList = [];

for (let i = 0; i < 86; i++){
  testUserList.push(Mock.mock({
    id:Mock.Random.increment(),
    userId:Mock.Random.increment(),
    userName:Mock.Random.cname(),
    testId:Mock.Random.increment(),
    testTitle:Mock.Random.ctitle(),
    testTime:Mock.Random.datetime(),
    testAnswerTitle:Mock.Random.ctitle(),
    testAnswerImg:Mock.Random.image('640x320','#ffffff'),
    channel:Mock.Random.name(),
  }))
}


export { 
  LoginUsers, 
  Users, 
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
  testUserList
  };
