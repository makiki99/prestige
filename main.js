var data = {
	coins: 0,
	template:["Amount","First upgrade","Second upgrade","Third Upgrade","Amount bought"],
	prestiges:[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
};

function getGain() {
	var gain = 1;
	for (var i = 0; i < 10; i++) {
	     gain *= 1+Math.pow(data.prestiges[i][0], getUpgradeEffect(i, 2));
	     
	     }
	return gain;
}

function getUpgradeRequirement(tier, id) {
	if (id == 1 && data.prestiges[tier][1] < 10*(tier+1)) return "Upgrade maxxed!";
	else return Math.pow(2, data.prestiges[tier+1][id]);
}
function getRequirement(id) {
	if (id < 9 && id > 0) {
		return Math.floor(Math.pow(id+1-getUpgradeEffect(id, 1), data.prestiges[id][4]));
	}
	if (id == 0) return Math.floor(Math.pow(1.5-getUpgradeEffect(id, 1), data.prestiges[id][4]));
	if (id == 9)  return Math.floor(Math.pow(id+1, data.prestiges[id][4]));
}

function canActivatePrestige(id) {
	if (id===0) {
		return (data.coins >= getRequirement(0));
	} else {
		return (data.prestiges[id-1] >= getRequirement(id));
	}
}

function upgrade(tier,id) {
	if (data.prestiges[tier+1][0] > getUpgradeRequirement(tier,id)) {
		data.prestiges[tier+1][0] -= getUpgradeRequirement(tier,id)
		data.prestiges[tier][id]++;
	}
}

function getUpgradeEffect(tier, id) {
	if (id == 1) {
		switch(tier) {
			case 0:	
				return 0.04*data.prestiges[0][1]; 
			break
			case 1:
				return 0.045*data.prestiges[1][1];
			break
			case 2:
				return 0.063*data.prestiges[2][1];
			break
			case 3:
				return 0.0725*data.prestiges[3][1];
			break
			case 4:
				return 0.078*data.prestiges[4][1];
			break
			case 5:
				return 0.0816*data.prestiges[5][1];
			break
			case 6:
				return 0.0842*data.prestiges[6][1];
			break
			case 7:
				return 0.08625*data.prestiges[7][1];
			break
			case 8:
				return 0.0877*data.prestiges[8][1];
			break
		}
	} else {
		switch(id) {
			case 2:
				return 1+(data.prestiges[tier][2]/10); 
			break
			case 3:
				return data.prestiges[tier][3]+1; 
			break
	}
	}
}
function activatePrestige(id) {
	if (canActivatePrestige(id)) {
			data.coins = 0;
			for (var i = 0; i < id; i++) {
				data.prestiges[i] = 0;
			}
			data.prestiges[id][4]++;
			data.prestiges[id][0]+=getUpgradeEffect(id, 3)
	}
	draw();
}
function update() {
	data.coins += (getGain()/100);
	localStorage.SHITPOST = JSON.stringify(data);
}

function draw() {
	document.getElementById("coins").innerHTML = "e"+Math.floor(Math.log10(Math.floor(data.coins))*100)/100;
	document.getElementById("gain").innerHTML = getGain();
	data.prestiges.forEach(function (el, i) {
		if (i == 0) {
			document.getElementById("tier"+(i+1)+"cost").innerHTML = "e"+Math.floor(Math.log10(getRequirement(i))*100)/100;
		} else {
		document.getElementById("tier"+(i+1)+"cost").innerHTML = getRequirement(i);
		}
		if (i < 9) {
		document.getElementById("tier"+(i+1)+"up1cost").innerHTML = getUpgradeRequirement(i, 1);
		document.getElementById("tier"+(i+1)+"up2cost").innerHTML = getUpgradeRequirement(i, 2);
		document.getElementById("tier"+(i+1)+"up3cost").innerHTML = getUpgradeRequirement(i, 3);
		document.getElementById("tier"+(i+1)+"gain").innerHTML = getUpgradeEffect(i, 3);
		document.getElementById("tier"+(i+1)+"gain2").innerHTML = "+"+getUpgradeEffect(i, 3)-1;
		document.getElementById("tier"+(i+1)+"scal").innerHTML = "-"+getUpgradeEffect(i, 1);
		document.getElementById("tier"+(i+1)+"expmul").innerHTML = "^"+getUpgradeEffect(i, 1);
		document.getElementById("tier"+(i+1)+"mul").innerHTML = "x"+1+Math.pow(data.prestiges[i][0], getUpgradeEffect(i, 2));
		document.getElementById("tier"+(i+1)+"a").innerHTML = data.prestiges[i][0]
		}else {
			document.getElementById("tier"+(i+1)+"mul").innerHTML = el+1;
			document.getElementById("tier"+(i+1)+"a").innerHTML = el;
		}
		
		
		if (canActivatePrestige(i)) {
			document.getElementById("tier"+(i+1)+"btn").disabled = false;
		} else {
			document.getElementById("tier"+(i+1)+"btn").disabled = true;
		}
	})
}

window.addEventListener("load",function () {
	if (localStorage.SHITPOST) {
		data = JSON.parse(localStorage.SHITPOST)
	}
	draw();
	setInterval(function () {
		update();
		draw();
	}, 10);
	console.log("interval loaded")
})
