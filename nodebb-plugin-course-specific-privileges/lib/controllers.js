/** NODEBB LIBRARIES  */
const { group } = require("yargs");
const groups = require("../../src/groups");
const privs = require("../../src/privileges");
const { reset } = require("mousetrap");


/** GLOBAL VARIABLES  */
const courseGroups = ['students','assistant-staff','staff'];


const studentPrivs = [['groups:general:chat',{label: '[[admin/manage/privileges:allow-general-chat]]',type:'posting'}]];
const assistantStafPrivs  = 
[['groups:general:chat',{label: '[[admin/manage/privileges:allow-general-chat]]',type:'posting'}],
['groups:view:private:posts',{label: '[[admin/manage/privileges:view-private-posts]]',type:'viewing'}]];
const stafPrivs  = [['general:chat',{label: '[[admin/manage/privileges:allow-general-chat]]',type:'posting'}],
['groups:view:private:posts',{label: '[[admin/manage/privileges:view-private-posts]]',type:'viewing'}],
['groups:post:restricted:channels',{label: '[[admin/manage/privileges:post-in-restricted-channels]]',type:'posting'}]];

/* MUST ENABLE DEFAULT PRIVILEGES IN ORDER TO SEE ON ADMIN DASHBOARD */
const defaultPrivileges = [
    'groups:chat', 'groups:upload:post:image', 'groups:signature', 'groups:search:content',
    'groups:search:users', 'groups:search:tags', 'groups:view:users', 'groups:view:tags', 'groups:view:groups',
    'groups:local:login',
];
const studentPrivsLabels = ['groups:general:chat'];
const assistantStafPrivsLabels = ['groups:general:chat','groups:view:private:posts'];
const stafPrivsLabels = ['groups:general:chat','groups:view:private:posts','groups:post:restricted:channels'];

/** MAIN FUNCTIONS  */
const Controllers = module.exports;

async function resetCourseGroup(gname) {
    // console.log(`resetingCourseGroup \n`);
    await groups.destroy([gname]);
    await createCourseGroup(gname);
    // const [groupExists] = await groups.exists([gname]);
    // if (!groupExists){
    //     await groups.create({
    //         name: gname,
    //         hidden: 1,
    //         private: 1,
    //         disableJoinRequests: 1,
    //         system: 1,
    //         disableLeave: 1
    //     });
    // }
    // await groups.show(gname);
    
};

async function createCourseGroup(gname) {
    const [groupExists] = await groups.exists([gname]);
    if (!groupExists){
        await groups.create({
            name: gname,
            hidden: 1,
            private: 1,
            disableJoinRequests: 1,
            system: 1,
            disableLeave: 1
        });
    }
    // await groups.show(gname);
    
};

Controllers.initializeCoursePrivileges = async function (privMapData) {
    const privMap = privMapData['privileges'];
    // console.log(privMapData['privileges']);
    newPrivs = [].concat.apply([], [studentPrivs,assistantStafPrivs,stafPrivs])

    async function updatePrivs(priv) {
        // console.log("attempting to update privileges \n");
        // console.log(priv[0]);
        if (privMap) {privMap.set(priv[0],priv[1]);}
        
    }
    
    await newPrivs.forEach((priv) => updatePrivs(priv));
    // console.log(privMap);
}


Controllers.createCourseGroups = async function () {
    await courseGroups.forEach((group) => resetCourseGroup(group));
}

Controllers.giveCourseGroupPrivs = async function () {
    await privs.global.give(studentPrivsLabels.concat(defaultPrivileges),'students');
    await privs.global.give(assistantStafPrivsLabels.concat(defaultPrivileges),'assistant-staff');
    await privs.global.give(stafPrivsLabels.concat(defaultPrivileges),'staff');
}

// async function listGlobalPrivs(privMapData) {
//     const privMap = privMapData['privileges'];
//     // console.log(privMapData['privileges']);
//     newPrivs = [].concat.apply([], [studentPrivs,assistantStafPrivs,stafPrivs])

//     async function updatePrivs(priv) {
//         // console.log("attempting to update privileges \n");
//         // console.log(priv[0]);
//         if (privMap) {privMap.set(priv[0],priv[1]);}
        
//     }
    
//     return privMap;
//     // console.log(privMap);
    
// };



