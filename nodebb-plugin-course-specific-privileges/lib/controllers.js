/** NODEBB LIBRARIES  */
const groups = require("../../src/groups/create");
const privs = require("../../src/privileges");


/** GLOBAL VARIABLES  */
const courseGroups = ['students','assistant-staff','staff'];

const studentPrivs = [['general:chat',{label: '[[admin/manage/privileges:allow-general-chat]]',type:'posting'}]];
const assistantStafPrivs  = 
[['general:chat',{label: '[[admin/manage/privileges:allow-general-chat]]',type:'posting'}],
['view:private:posts',{label: '[[admin/manage/privileges:view-private-posts]]',type:'viewing'}]];
const stafPrivs  = [['general:chat',{label: '[[admin/manage/privileges:allow-general-chat]]',type:'posting'}],
['view:private:posts',{label: '[[admin/manage/privileges:view-private-posts]]',type:'viewing'}],
['post:restricted:channels',{label: '[[admin/manage/privileges:post-in-restricted-channels]]',type:'posting'}]];

/** MAIN FUNCTIONS  */
async function createCourseGroup(gname) {
    await groups.create({
        name: gname,
        hidden: 1,
        private: 1,
        disableJoinRequests: 1,
        system: 1,
        disableLeave: 1
    });
}

async function initializeCoursePrivileges(privMap) {
    console.log(privMap);
    newPrivs = [].concat.apply([], [studentPrivs,assistantStafPrivs,stafPrivs])

    async function updatePrivs(priv) {
        privMap.set(priv)
    }
    
    await newPrivs.forEach((priv) => updatePrivs(priv))
}


async function createCourseGroups() {
    await courseGroups.forEach((group) => createCourseGroup(group));
}

async function giveCourseGroupPrivs() {
    await privs.global.give(studentPrivs,'students');
    await privs.global.give(assistantStafPrivs,'assistant-staff');
    await privs.global.give(assistantStafPrivs,'staff');
}


