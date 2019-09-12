var data = {
	coins: 0,
	prestiges: [0,0,0,0,0,0,0,0,0,0]
};

function getGain() {
	var gain = 1;
	gain*=(data.prestiges[0]+1)*(data.prestiges[1]/2+1)*(data.prestiges[2]/3+1)
	gain*=(data.prestiges[1]+1)*(data.prestiges[2]/2+1)*(data.prestiges[3]/3+1)
	gain*=(data.prestiges[2]+1)*(data.prestiges[3]/2+1)*(data.prestiges[4]/3+1)
	gain*=(data.prestiges[3]+1)*(data.prestiges[4]/2+1)*(data.prestiges[5]/3+1)
	gain*=(data.prestiges[4]+1)*(data.prestiges[5]/2+1)*(data.prestiges[6]/3+1)
	gain*=(data.prestiges[5]+1)*(data.prestiges[6]/2+1)*(data.prestiges[7]/3+1)
	gain*=(data.prestiges[6]+1)*(data.prestiges[7]/2+1)*(data.prestiges[8]/3+1)
	gain*=(data.prestiges[7]+1)*(data.prestiges[8]/2+1)*(data.prestiges[9]/3+1)
	gain*=(data.prestiges[8]+1)*(data.prestiges[9]/2+1)
	gain*=(data.prestiges[9]+1)
	return gain
}

function getRequirement(id) {
	if (id === 0) {
		return Math.floor(Math.pow(1+(Math.pow(0.90, data.prestiges[1])*0.5),data.prestiges[0])*10);
	} else if (id === 9) {
		return Math.floor(Math.pow(10, data.prestiges[id]+1))
		
	} else {
		return Math.floor(Math.pow(1+(id*Math.pow(0.9-id*0.05, data.prestiges[id+1])),data.prestiges[id]+1))
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
	document.getElementById("coins").innerHTML = Math.floor(data.coins);
	document.getElementById("gain").innerHTML = getGain();
	data.prestiges.forEach(function (el, i) {
		document.getElementById("tier"+(i+1)+"cost").innerHTML = getRequirement(i);
		document.getElementById("tier"+(i+1)+"a").innerHTML = el;
		document.getElementById("tier"+(i+1)+"mul").innerHTML = "x"+(el+1);
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
