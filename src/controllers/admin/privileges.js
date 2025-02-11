'use strict';

const categories = require('../../categories');
const privileges = require('../../privileges');

const privilegesController = module.exports;

privilegesController.get = async function (req, res) {
	console.log("getting privlege data \n");
	const cid = req.params.cid ? parseInt(req.params.cid, 10) || 0 : 0;
	const isAdminPriv = req.params.cid === 'admin';

	let privilegesData;
	if (cid > 0) {
		console.log("cid > 0; \n");
		privilegesData = await privileges.categories.list(cid);
	} else if (cid === 0) {
		console.log(`cid = 0; isAdminPPriv ${isAdminPriv}\n`);
		privilegesData = await (isAdminPriv ? privileges.admin.list(req.uid) : privileges.global.list());
		// console.log("group priv list: \n");
		// console.log(JSON.stringify(privilegesData));
	}

	const categoriesData = [{
		cid: 0,
		name: '[[admin/manage/privileges:global]]',
		icon: 'fa-list',
	}, {
		cid: 'admin',
		name: '[[admin/manage/privileges:admin]]',
		icon: 'fa-lock',
	}];

	let selectedCategory;
	categoriesData.forEach((category) => {
		if (category) {
			category.selected = category.cid === (!isAdminPriv ? cid : 'admin');

			if (category.selected) {
				selectedCategory = category;
			}
		}
	});
	if (!selectedCategory) {
		selectedCategory = await categories.getCategoryFields(cid, ['cid', 'name', 'icon', 'bgColor', 'color']);
	}

	const group = req.query.group ? req.query.group : '';

	console.log(`privleges: ${JSON.stringify(privilegesData)}`);
	res.render('admin/manage/privileges', {
		privileges: privilegesData,
		categories: categoriesData,
		selectedCategory,
		cid,
		group,
		isAdminPriv,
	});
};
