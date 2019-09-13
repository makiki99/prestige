var data = {
	coins: 0,
	prestiges: [0,0,0,0,0,0,0,0,0,0]
};

function getGain() {
	var gain = 1;
	for (var i = 0; i < 10; i++) {
	     gain *= 1+Math.pow(data.prestiges[i], 4);
	     
	     }
	return gain;
}

function getRequirement(id) {
	if (id === 0) {
		return Math.floor(Math.pow(1+(Math.pow(0.90, Math.sqrt(Math.pow(data.prestiges[1],1.2)))*0.4),data.prestiges[0])*(10+data.prestiges[0])/(Math.sqrt(data.prestiges[1])+1));
	} else if (id === 9) {
		return Math.floor(Math.pow(10, data.prestiges[id]+1))
	} else if (id === 1) {
		return Math.floor(Math.pow(1+((id+1)/3.1*Math.pow(0.8-id*0.05, Math.sqrt(Math.pow(data.prestiges[id+1],1.5)))),data.prestiges[id]+1)/data.prestiges[id+1]+1)
	} else {
		return Math.floor(Math.pow(1+((id+1)/2.1*Math.pow(0.8-id*0.05, Math.sqrt(Math.pow(data.prestiges[id+1],1.5)))),data.prestiges[id]+1)/(Math.sqrt(data.prestiges[id+1])+1))
	}
}

function canActivatePrestige(id) {
	if (id===0) {
		return (data.coins >= getRequirement(0));
	} else {
		return (data.prestiges[id-1] >= getRequirement(id));
	}
}

function activatePrestige(id) {
	if (canActivatePrestige(id)) {
			data.coins = 0;
			for (var i = 0; i < id; i++) {
				data.prestiges[i] = 0;
			}
			data.prestiges[id]++;
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
		document.getElementById("tier"+(i+1)+"a").innerHTML = el;
		document.getElementById("tier"+(i+1)+"mul").innerHTML = "x"+Math.floor(Math.sqrt(Math.pow(2,data.prestiges)));
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
	for (var i = 0; i < 10; i++) {
		document.getElementById("tier"+(i+1)+"btn").addEventListener(
			"click",
			(function(n) {
				return (function () {
					activatePrestige(n);
				})
			}(i))
		);
	}
	setInterval(function () {
		update();
		draw();
	}, 10);
	console.log("interval loaded")
})
