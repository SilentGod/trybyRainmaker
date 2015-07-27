
/**
* @file: Task0003 Js file
* @author: Mr.pc
*/


/*
datastructure

categoryList = {
    'uuid': {
        'name': 'categoryname0',
        'subcategory': ""
    },
    'uuid': {
        'name': 'categoryname0',
        'subcategory': {
            'uuid': {
                'name': 'categoryname0',
                'subcategory': ""
            },
        }
    }
}
}

taskList = {
    'uuixxxxxxxxxxd': {
        'uuid': 'xxxxxxxxxx',
        'title': 'xxxxxxxxxxx',
        'date': 'xxxx-xx-xx',
        'category': 'xxxxxx',
        'status': 0,
        'content': 'xxxxxxxxxxxxxx'
    },
    'uuxxxxxxxxxxid': {
        'uuid': 'xxxxxxxxx',
        'title': 'xxxxxxxxxxx',
        'date': 'xxxx-xx-xx',
        'category': 'xxxxxx',
        'status': 0,
        'content': 'xxxxxxxxxxxxxx'
    },
}
*/

var categoryList = {};
var    taskList = {};

window.onload = function () {
    readData();
    //    console.log(categoryList);
    //    console.log(taskList);
    init();
};

function readData() {
    categoryListTemp = localStorage.getItem("categoryList") || '{"xxxxxxxx":{"name":"默认分类","subcategory":""}}';
    categoryList = JSON.parse(categoryListTemp);
    taskListTemp = localStorage.getItem('taskList') || '{}';
    taskList = JSON.parse(taskListTemp);
}

function saveData() {
    localStorage.setItem('categoryList', JSON.stringify(categoryList));
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

// 初始化页面
function init() {
    if (taskList === {}) {
        // console.log('taskList is empty');
        return 0;
    }
    // 绑定 新建任务 事件
    var addtaskButton = document.getElementById('addtask');
    addtaskButton.onclick = function (event) {
        addtaskFun();
        stopBubble(event);
    };

    // 绑定 新建分类 click 事件
    var addcategoryButton = document.getElementById('addcategory');
    addcategoryButton.onclick = function (event) {
        var categorylistulElement = document.getElementById('categorylistul');
        var currentCategory = searchCurrentCategory(categorylistulElement);
        var newcatgory = prompt('请输入' + (currentCategory ? '在 '+ categoryList[currentCategory]['name'] + ' 分类下': '') + '新建分类名称：');

        if (newcatgory != null) {
            // currentCategory != false
            if (currentCategory) {
                // console.log(currentCategory);
                // console.log(newcatgory);
                categoryList[currentCategory]['subcategory'] = {};
                categoryList[currentCategory]['subcategory'][randomString(8)] = {
                    name: newcatgory,
                    subcategory: ''
                };
                // console.log(categoryList[currentCategory]['subcategory']);
            } else {
                categoryList[randomString(8)] = {
                    name: newcatgory,
                    subcategory: ''
                };
            }
            saveData();
            showCategoryList();
            stopBubble(event);
        }
    };

    showCategoryList();


    // 绑定alltask区域的click事件，显示所有任务
    var alltaskElement = document.getElementById('alltask');
    alltaskElement.onclick = function (event) {
        var categorylistulElement = document.getElementById('categorylistul');
        for (var i = 0; i < categorylistulElement.childNodes.length; i++) {
            if (categorylistulElement.childNodes[i].className == 'on') {
                categorylistulElement.childNodes[i].className = ''
            }
        }
        showTaskList();
        stopBubble(event);
    };

    // 绑定 中间栏 的 “完成”、“已完成”、“未完成”按钮的 click事件
    var taskstatusalltaskButton = document.getElementById('taskstatusalltask');
    var taskstatusunfinishButton = document.getElementById('taskstatusunfinish');
    var taskstatusfinishButton = document.getElementById('taskstatusfinish');
    taskstatusalltaskButton.onclick = function (event) {

        for (var i = 0; i < this.parentNode.childNodes.length; i++) {
            this.parentNode.childNodes[i].className = '';
        }
        this.className = 'on';
        showTaskList();
        stopBubble(event);
    };
    taskstatusunfinishButton.onclick = function (event) {
        for (var i = 0; i < this.parentNode.childNodes.length; i++) {
            this.parentNode.childNodes[i].className = '';
        }
        this.className = 'on';
        showTaskList();
        stopBubble(event);
    };
    taskstatusfinishButton.onclick = function (event) {
            for (var i = 0; i < this.parentNode.childNodes.length; i++) {
                this.parentNode.childNodes[i].className = '';
            }
        this.className = 'on';
            showTaskList();
            stopBubble(event);
        };
        // 显示任务列表
    showTaskList();

    // 编辑框 初始化
    taskEditInit();

}

// 显示分类列表
function showCategoryList() {
    var categorylistulElement = document.getElementById('categorylistul');
    clearChildElements(categorylistulElement);

    // 统计各个分类下的任务数目
    var taskNumPerCategory = {};
    for(var xxx in taskList) {
        if (taskList[xxx]['category'] in taskNumPerCategory) {
            taskNumPerCategory[taskList[xxx]['category']] += 1;
        } else{
            taskNumPerCategory[taskList[xxx]['category']] = 1
        }
    }


    for (var item in categoryList) {
        if (categoryList[item]['subcategory'] == "") {
            var liElement = document.createElement('li');
            var node = document.createTextNode(categoryList[item]['name'] + ((item in taskNumPerCategory)
                ? ' ('+ taskNumPerCategory[item] + ')' : ''));
            liElement.appendChild(node);
            if (item != 'xxxxxxxx') {
                var spanElement = document.createElement('span');
                var spanNode = document.createTextNode('X');
                spanElement.appendChild(spanNode);
                spanElement.className = 'removecategory';
                spanElement.onclick = function () {
                    var con = confirm('确定删除' + categoryList[this.parentNode.getAttribute('uuid')]['name'] + "？");
                    if (con == true) {

                        for (var xx in taskList) {
                            if (taskList[xx]['category'] == this.parentNode.getAttribute('uuid')) {
                                delete taskList[xx];
                                // console.log(taskList[xx])
                            }
                        }

                        // console.log(categoryList[this.parentNode.getAttribute('uuid')])
                        delete categoryList[this.parentNode.getAttribute('uuid')];
                        saveData();
                        showCategoryList();
                        showTaskList();
                    }
                };
                liElement.appendChild(spanElement);
            }
            liElement.setAttribute('uuid', item);
            liElement.onclick = function (event) {
                for (var i = 0; i < this.parentNode.childNodes.length; i++) {
                    this.parentNode.childNodes[i].className = '';
                }
                this.className = "on";
                showTaskList();
                // 进入新的分类时，关闭任务详情的显示
                document.getElementById('taskdetail').style.display = 'none';
                stopBubble(event);

            };
            categorylistulElement.appendChild(liElement);
        }
        else {
            var parentLiElement = document.createElement('li');
            var ulElement = document.createElement('ul');
            var node = document.createTextNode(categoryList[item]['name']);
            // console.log(categoryList[item]['name']);
            // console.log(categoryList[item]['subcategory']);
            for (var subitem in categoryList[item]['subcategory']) {
                var liElement = document.createElement('li');
                var subNode = document.createTextNode(categoryList[item]['subcategory'][subitem]['name']);
                // console.log(subitem);
                // console.log(categoryList[item]['subcategory'][subitem])
                // console.log(categoryList[item]['subcategory'][subitem]['name'])
                liElement.appendChild(subNode);
                liElement.setAttribute('uuid', subitem);
                liElement.onclick = function (event) {
                    for (var i = 0; i < this.parentNode.childNodes.length; i++) {
                        this.parentNode.childNodes[i].className = '';
                    }
                    this.className = "on";
                    showTaskList();
                    // 进入新的分类时，关闭任务详情的显示
                    document.getElementById('taskdetail').style.display = 'none';
                    stopBubble(event);
                };
                ulElement.appendChild(liElement);
            }

            parentLiElement.appendChild(node);
            parentLiElement.appendChild(ulElement);
            parentLiElement.setAttribute('uuid', item);
            parentLiElement.onclick = function (event) {
                for (var i = 0; i < this.parentNode.childNodes.length; i++) {
                    this.parentNode.childNodes[i].className = '';
                }
                this.className = "on";
                showTaskList();
                stopBubble(event);
            };

            categorylistulElement.appendChild(parentLiElement);
        }
    }

}


// 递归检测当前要显示的分类项
function searchCurrentCategory(ulElement) {
    // console.log('1: ');
    // console.log(ulElement);
    if (ulElement.className == 'on') {
        return ulElement.getAttribute('uuid');
    }
    for (var i = 0; i < ulElement.childNodes.length; i++) {
        // console.log('2: ');
        // console.log(ulElement.childNodes[i]);
        if (ulElement.childNodes[i].tagName == "UL") {
            var temp = searchCurrentCategory(ulElement.childNodes[i]);
            if (temp != false) {
                return temp;
            } else {
                return false;
            }
        } else {
            // console.log('3: ');
            // console.log(ulElement.childNodes[i]);
            if (ulElement.childNodes[i].className == 'on') {
                return ulElement.childNodes[i].getAttribute('uuid');
            }
        }
    }
    return false;
}


// 显示任务列表
function showTaskList() {
    var todoDetailListElement = document.getElementById('tododetaillist');
    // 移除当前的列表内容
    clearChildElements(todoDetailListElement);
    // 获取当前要显示的分类和状态
    var currentStatus = 'taskstatusunfinish';
    var currentCategory = false;
    var taskstatusButtonList = document.getElementById('taskstatus').getElementsByTagName('button');
    for (var i = 0; i < taskstatusButtonList.length; i++) {
        if (taskstatusButtonList[i].className == "on") {
            currentStatus = taskstatusButtonList[i].id;
            break;
        }
    }
    var categorylistulElement = document.getElementById('categorylistul');
    currentCategory = searchCurrentCategory(categorylistulElement);
    // 显示 当前要显示的分类和状态
    // console.log('currentStatus：  ' + currentStatus);
    // console.log('currentCategory：  ' + currentCategory);



    var taskListDateArray = {};
    for (var item in taskList) {
        //        console.log(item)
        if (taskList[item]['date'] in taskListDateArray) {
            taskListDateArray[taskList[item]['date']].push(taskList[item]);
        } else {
            taskListDateArray[taskList[item]['date']] = [taskList[item]];
        }
    }
    //    console.log(taskListDateArray);
    // 调整任务列表顺序
    taskListDateArray = sortObjectMember(taskListDateArray);

    for (var item in taskListDateArray) {
        var ulElement = document.createElement('ul');
        var paraElement = document.createElement('p');
        var node = document.createTextNode(item);
        paraElement.appendChild(node);
        ulElement.appendChild(paraElement);
        for (var i = 0; i < taskListDateArray[item].length; i++) {
            if (currentStatus == 'taskstatusunfinish' && taskListDateArray[item][i]['status'] == 1) {
                continue;
            } else if (currentStatus == 'taskstatusfinish' && taskListDateArray[item][i]['status'] == 0) {
                continue;
            }

            if (currentCategory != false && currentCategory != taskListDateArray[item][i]['category']) {
                continue;
            }

            var liElement = document.createElement('li');
            var node = document.createTextNode(taskListDateArray[item][i]['title']);
            liElement.appendChild(node);
            liElement.setAttribute('uuid', taskListDateArray[item][i]['uuid']);

            if (taskListDateArray[item][i]['status'] == 1) {
                liElement.style.color = '#97F674';
            }
            liElement.onclick = function (event) {
                // 改变背景颜色
                var liElementAll = this.parentNode.parentNode.getElementsByTagName('li');
                for (var i = 0; i < liElementAll.length; i++) {
                    liElementAll[i].className = '';
                }
                this.className = 'on';
                showTaskDetail(this.getAttribute('uuid'));

            };
            ulElement.appendChild(liElement);
        }
        if (ulElement.childNodes.length == 1) {
            continue;
        }
        todoDetailListElement.appendChild(ulElement);
    }
}

// 显示任务详情信息
// 添加查找当前所选中的任务 的函数，取消 参数传递
function showTaskDetail(uuidargument) {
    var tasktitleElement = document.getElementById('tasktitle');
    tasktitleElement.innerText = taskList[uuidargument]['title'];
    var taskdateElement = document.getElementById('taskdate');
    taskdateElement.innerText = taskList[uuidargument]['date'];
    var taskcontentElement = document.getElementById('taskcontent');
    taskcontentElement.innerText = taskList[uuidargument]['content'];
    var taskdetailfinishButton = document.getElementById('taskdetailfinish');
    taskdetailfinishButton.setAttribute('uuid', uuidargument);
    var taskdetaileditButton = document.getElementById('taskdetailedit');
    taskdetaileditButton.setAttribute('uuid', uuidargument);
    var taskdetailElement = document.getElementById('taskdetail');
    taskdetailElement.style.display = 'block';

    // 绑定 完成按钮 的操作，显示 确认完成 的浮层
    taskdetailfinishButton.onclick = function (event) {
        var promptconfirmcontainerElement = document.getElementById('promptconfirmcontainer');
        promptconfirmcontainerElement.style.display = 'block';
        var promptconfirmElement = document.getElementById('promptconfirm');
        //                    console.log(promptconfirmElement)
        var finishButton = promptconfirmElement.getElementsByTagName('button')[0];

        // 绑定 确认完成 的浮层 的 完成 按钮
        finishButton.onclick = function (event) {
            var tempElement = document.getElementById('taskdetailfinish');
            tempElement.setAttribute('status', 'finish');
            this.parentNode.parentNode.style.display = 'none';

            // 如果确认完成，则更新数据
            var taskdetailfinishButton = document.getElementById('taskdetailfinish');
            // console.log(taskdetailfinishButton.getAttribute('status'));
            if (taskdetailfinishButton.getAttribute('status') == 'finish') {
                // console.log(taskList[taskdetailfinishButton.getAttribute('uuid')]);
                taskList[taskdetailfinishButton.getAttribute('uuid')]['status'] = 1;
                saveData();
                showTaskList();
            }
        };
        var cancelButton = promptconfirmElement.getElementsByTagName('button')[1];
        cancelButton.onclick = function (event) {
            var tempElement = document.getElementById('taskdetailfinish');
            tempElement.setAttribute('status', 'unfinish');
            this.parentNode.parentNode.style.display = 'none';
        }

    };

    // 绑定 编辑 按钮的操作
    taskdetaileditButton.onclick = function () {
        var taskedittitleInput = document.getElementById('taskedittitle');
        var taskeditdateInput = document.getElementById('taskeditdate');
        var taskeditcontentInput = document.getElementById('taskeditcontent');

        taskedittitleInput.value = taskList[this.getAttribute('uuid')]['title'];
        taskeditdateInput.value = taskList[this.getAttribute('uuid')]['date'];
        taskeditcontentInput.value = taskList[this.getAttribute('uuid')]['content'];

        var taskeditpromptButton = document.getElementById('taskeditprompt');
        taskeditpromptButton.setAttribute('uuid', this.getAttribute('uuid'));

        var taskeditElement = document.getElementById('taskedit');
        taskeditElement.style.display = 'block';

        stopBubble(event);
    };
    stopBubble(event);
}


// 编辑框 初始化
function taskEditInit() {
    var taskedittitleInput = document.getElementById('taskedittitle');
    var taskeditdateInput = document.getElementById('taskeditdate');
    var taskeditcontentInput = document.getElementById('taskeditcontent');
    var taskeditElement = document.getElementById('taskedit');
    var taskeditpromptButton = document.getElementById('taskeditprompt');
    var taskeditcancelButton = document.getElementById("taskeditcancel");

    // 恢复任务编辑框的相关绑定信息
    function taskEditFrameBack() {
        taskedittitleInput.value = "请输入任务名称";
        taskeditdateInput.value = "请输入任务时间";
        taskeditcontentInput.value = "任务详情";
        taskeditpromptButton.setAttribute('uuid', '');
    }

    // 绑定任务提交按钮的事件
    taskeditpromptButton.onclick = function (event) {
            if (taskEditPrompt()) {

                // 刷新任务列表
                showTaskList();
                showTaskDetail(taskeditpromptButton.getAttribute('uuid'));
                taskEditFrameBack();
            }
        stopBubble(event);
        };
        // 绑定取消任务提交按钮的事件

    taskeditcancelButton.onclick = function (event) {
        taskeditElement.style.display = 'none';
        taskEditFrameBack();
        stopBubble(event);
    }
}


// 添加任务
function addtaskFun() {
    var taskeditElement = document.getElementById('taskedit');
    taskeditElement.style.display = 'block';

    // 绑定输入框事件：点击即清空提示文字
    function clearInput(inputelement, origvalue) {
        if (inputelement.value == origvalue) {
            // console.log('inputelement will be empty');
            inputelement.value = '';
        } else {
            // console.log('inputelement is empty')
        }
    }
    var taskedittitleInput = document.getElementById('taskedittitle');
    taskedittitleInput.onclick = function (event) {
        clearInput(taskedittitleInput, '请输入任务名称');
        stopBubble(event);
    };
    var taskeditdateInput = document.getElementById('taskeditdate');
    taskeditdateInput.onclick = function (event) {
        clearInput(taskeditdateInput, '请输入任务时间');
        stopBubble(event);
    };
    var taskeditcontentInput = document.getElementById('taskeditcontent');
    taskeditcontentInput.onclick = function (event) {
        clearInput(taskeditcontentInput, '任务详情');
        stopBubble(event);
    };
}

// 提交
function taskEditPrompt() {
    var taskedittitleInput = document.getElementById('taskedittitle');
    var taskeditdateInput = document.getElementById('taskeditdate');
    var taskeditcontentInput = document.getElementById('taskeditcontent');
    var taskeditElement = document.getElementById('taskedit');
    var taskTemp = {};

    if (taskedittitleInput.value == '请输入任务名称' || taskedittitleInput.value.match(/^\s$|^$/) != null) {
        alert('请输入任务名称');
        return false;
    } else if (taskedittitleInput.value.length > 20) {
        alert('标题过长！');
        return false;
    } else {
        taskTemp.title = taskedittitleInput.value;
    }
    if (taskeditdateInput.value == '请输入任务时间' || taskeditdateInput.value.match(/^\s$|^$/) != null) {
        alert('请输入任务时间');
        return false;
    } else if (isDate(taskeditdateInput.value.trim()) == false) {
        alert('请输入格式正确的日期\n\r日期格式：yyyy-mm-dd\n\r例    如：2008-08-08\n\r');
        return false;
    } else {
        taskTemp.date = taskeditdateInput.value;
    }
    if (taskeditcontentInput.value == '任务详情' || taskeditcontentInput.value.match(/^\s$|^$/) != null) {
        alert('任务详情');
        return false;
    } else {
        taskTemp.content = taskeditcontentInput.value;
    }
    taskTemp.status = 0;

    var taskeditpromptButton = document.getElementById('taskeditprompt');
    var currnetTaskUuid = taskeditpromptButton.getAttribute('uuid') || "";
    if (currnetTaskUuid in taskList) {
        // console.log('1');
        taskList[currnetTaskUuid]['title'] = taskedittitleInput.value;
        taskList[currnetTaskUuid]['date'] = taskeditdateInput.value;
        taskList[currnetTaskUuid]['content'] = taskeditcontentInput.value;
        taskeditElement.style.display = 'none';
        // console.log('2');
    } else {
        var categorylistulElement = document.getElementById('categorylistul');
        var currentCategory = searchCurrentCategory(categorylistulElement);
        taskTemp.category = currentCategory;
        taskeditElement.style.display = 'none';
        //    console.log(taskTemp);
        var uuid = randomString(8);
        taskTemp['uuid'] = uuid;
        taskList[uuid] = taskTemp;
    }
    saveData();
    return true;
}
