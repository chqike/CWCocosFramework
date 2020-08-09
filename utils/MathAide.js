var lkpy = lkpy || {};


lkpy.FPointAngle = function (x, y, angle) {
    let p = {}
    p.x = x || 0;
    p.y = y || 0;
    p.angle = angle || 0;
    return p
};

lkpy.MathAide = {};


lkpy.MathAide.factorial = function (number) {
    var fac = 1;
    var temp = number;
    for (var i = 0; i < number; ++i) {
        fac *= temp;
        --temp;
    }
    return fac;
};

lkpy.MathAide.combination = function (count, r) {
    return lkpy.MathAide.factorial(count) / (lkpy.MathAide.factorial(r) * lkpy.MathAide.factorial(count - r));
};

lkpy.MathAide.calcDistance = function (x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
};

lkpy.MathAide.calcAngle = function (x1, y1, x2, y2) {
    var distance = lkpy.MathAide.calcDistance(x1, y1, x2, y2);
    if (distance == 0) {
        return 0.0;
    }
    var cosValue = (x1 - x2) / distance;
    var angle = Math.acos(cosValue);
    if (y1 < y2) {
        angle = 2 * Math.PI - angle;
    }
    angle += 2 * Math.PI;
    return angle;
};

/**
 *
 * @param initX {[]}
 * @param initY {[]}
 * @param initCount
 * @param traceVector {[]}
 * @param distance
 */
lkpy.MathAide.buildLiner = function (initX, initY, initCount, traceVector, distance) {
    traceVector.length = 0;
    if (initCount < 2) {
        return;
    }
    if (distance <= 0.0) {
        return;
    }

    var distanceTotal = lkpy.MathAide.calcDistance(initX[initCount - 1], initY[initCount - 1], initX[0], initY[0]);
    if (distanceTotal <= 0.0) {
        return;
    }

    var cosValue = Math.abs(initY[initCount - 1] - initY[0]) / distanceTotal;
    var radian = Math.acos(cosValue);

    var point = cc.v2();
    point.x = initX[0];
    point.y = initY[0];
    traceVector.push(cc.v2(point.x, point.y));
    var tempDistance = 0.0;

    var size;
    while (tempDistance < distanceTotal) {
        size = traceVector.length;
        if (initX[initCount - 1] < initX[0]) {
            point.x = initX[0] - Math.sin(radian) * (distance * size);
        } else {
            point.x = initX[0] + Math.sin(radian) * (distance * size);
        }

        if (initY[initCount - 1] < initY[0]) {
            point.y = initY[0] - Math.cos(radian) * (distance * size);
        } else {
            point.y = initY[0] + Math.cos(radian) * (distance * size);
        }

        traceVector.push(cc.v2(point.x, point.y));
        tempDistance = lkpy.MathAide.calcDistance(point.x, point.y, initX[0], initY[0]);
    }
    // 将最后一个点修改为 (initX[initCount-1],initY[initCount-1])
    var lastPoint = traceVector[traceVector.length - 1];
    lastPoint.x = initX[initCount - 1];
    lastPoint.y = initY[initCount - 1];
};

/**
 *
 * @param initX {[]}
 * @param initY {[]}
 * @param initCount
 * @param traceVector {[]}
 * @param distance
 */
lkpy.MathAide.buildLinerWithAngle = function (initX, initY, initCount, traceVector, distance) {
    traceVector.length = 0;
    if (initCount < 2) {
        return;
    }
    if (distance <= 0.0) {
        return;
    }

    var distanceTotal = lkpy.MathAide.calcDistance(initX[initCount - 1], initY[initCount - 1], initX[0], initY[0]);
    if (distanceTotal <= 0.0) {
        return;
    }

    var cosValue = Math.abs(initY[initCount - 1] - initY[0]) / distanceTotal;
    var radian = Math.acos(cosValue);

    var point = lkpy.FPointAngle();
    point.x = initX[0];
    point.y = initY[0];
    point.angle = 1.0;
    traceVector.push(lkpy.FPointAngle(point.x, point.y, point.angle));
    var tempDistance = 0.0;

    var tempPoint = lkpy.FPointAngle();

    var size;
    while (tempDistance < distanceTotal) {
        size = traceVector.length;
        if (initX[initCount - 1] < initX[0]) {
            point.x = initX[0] - Math.sin(radian) * (distance * size);
        } else {
            point.x = initX[0] + Math.sin(radian) * (distance * size);
        }

        if (initY[initCount - 1] < initY[0]) {
            point.y = initY[0] - Math.cos(radian) * (distance * size);
        } else {
            point.y = initY[0] + Math.cos(radian) * (distance * size);
        }

        var dis = lkpy.MathAide.calcDistance(point.x, point.y, tempPoint.x, tempPoint.y);
        if (dis != 0.0) {
            var tempValue = (point.x - tempPoint.x) / dis;
            if ((point.y - tempPoint.y) >= 0.0) {
                point.angle = Math.acos(tempValue);
            } else {
                point.angle = -Math.acos(tempValue);
            }
        } else {
            point.angle = 1.0;
        }

        tempPoint.x = point.x;
        tempPoint.y = point.y;
        traceVector.push(lkpy.FPointAngle(point.x, point.y, point.angle));
        tempDistance = lkpy.MathAide.calcDistance(point.x, point.y, initX[0], initY[0]);
    }
    // 将最后一个点修改为 (initX[initCount-1],initY[initCount-1])
    var lastPoint = traceVector[traceVector.length - 1];
    lastPoint.x = initX[initCount - 1];
    lastPoint.y = initY[initCount - 1];
};

/**
 *
 * @param initX {[]}
 * @param initY {[]}
 * @param initCount
 * @param traceVector {[]}
 * @param distance
 */
lkpy.MathAide.buildBezier = function (initX, initY, initCount, traceVector, distance) {
    traceVector.length = 0;

    var index = 0;
    var tempPos = {};
    var t = 0.0;
    var count = initCount - 1;
    var tempDistance = distance;
    var tempValue = 0.1;

    while (t < 1.0) {
        tempPos.x = 0.0;
        tempPos.y = 0.0;
        index = 0;
        while (index <= count) {
            tempValue = Math.pow(t, index) * Math.pow(1.0 - t, count - index) * lkpy.MathAide.combination(count, index);
            tempPos.x += initX[index] * tempValue;
            tempPos.y += initY[index] * tempValue;
            ++index;
        }

        var posSpace = 0.0;
        if (traceVector.length > 0) {
            var backPos = traceVector[traceVector.length - 1];
            posSpace = lkpy.MathAide.calcDistance(backPos.x, backPos.y, tempPos.x, tempPos.y);
        }
        if (posSpace >= tempDistance || traceVector.length == 0) {
            traceVector.push(tempPos);
        }

        t += 0.00001;
    }
};

/**
 *
 * @param initX {[]}
 * @param initY {[]}
 * @param initCount
 * @param traceVector {[]}
 * @param distance
 */
lkpy.MathAide.buildBezierFast = function (initX, initY, initCount, traceVector, distance) {
    traceVector.length = 0;

    var index = 0;
    var tempPos = {};
    var t = 0.0;
    var count = initCount - 1;
    var tempDistance = distance;
    var tempValue = 0.1;

    while (t < 1.0) {
        tempPos.x = 0.0;
        tempPos.y = 0.0;
        index = 0;
        while (index <= count) {
            tempValue = Math.pow(t, index) * Math.pow(1.0 - t, count - index) * lkpy.MathAide.combination(count, index);
            tempPos.x += initX[index] * tempValue;
            tempPos.y += initY[index] * tempValue;
            ++index;
        }

        var posSpace = 0.0;
        if (traceVector.length > 0) {
            var backPos = traceVector[traceVector.length - 1];
            posSpace = lkpy.MathAide.calcDistance(backPos.x, backPos.y, tempPos.x, tempPos.y);
        }
        if (posSpace >= tempDistance || traceVector.length == 0) {
            traceVector.push(tempPos);
        }

        t += 0.01;
    }
}

/**
 *
 * @param initX {[]}
 * @param initY {[]}
 * @param initCount
 * @param traceVector {[]}
 * @param distance
 */
lkpy.MathAide.buildBezier = function (initX, initY, initCount, traceVector, distance) {
    traceVector.length = 0;
    var pos1 = {};
    pos1.x = initX[0];
    pos1.y = initY[0];
    pos1.angle = 1.0;
    traceVector.push(pos1);

    var index = 0;
    var temp_pos0 = {};
    temp_pos0.x = 0.0;
    temp_pos0.y = 0.0;
    var t = 0.0;
    var count = initCount - 1;
    var temp_distance = distance;
    var temp_pos = {};
    temp_pos.x = 0.0;
    temp_pos.y = 0.0;
    var temp_value = 0.0;

    while (t < 1.0) {
        temp_pos.x = 0.0;
        temp_pos.y = 0.0;
        index = 0;
        while (index <= count) {
            temp_value = Math.pow(t, index) * Math.pow(1.0 - t, count - index) * lkpy.MathAide.combination(count, index);
            temp_pos.x += initX[index] * temp_value;
            temp_pos.y += initY[index] * temp_value;
            ++index;
        }

        var pos_space = 0.0;
        if (traceVector.length > 0) {
            var back_pos = traceVector[traceVector.length - 1];
            pos_space = lkpy.MathAide.calcDistance(back_pos.x, back_pos.y, temp_pos.x, temp_pos.y);
        }

        if (pos_space >= temp_distance || traceVector.length == 0) {
            if (traceVector.size() > 0) {
                var temp_dis = lkpy.MathAide.calcDistance(temp_pos.x, temp_pos.y, temp_pos0.x, temp_pos0.y);
                if (temp_dis != 0.0) {
                    var temp_value = (temp_pos.x - temp_pos0.x) / temp_dis;
                    if ((temp_pos.y - temp_pos0.y) >= 0.0) temp_pos.angle = acosf(temp_value);
                    else temp_pos.angle = -Math.acos(temp_value);
                } else {
                    temp_pos.angle = 1.0;
                }
            } else {
                temp_pos.angle = 1.0;
            }
            traceVector.push(temp_pos);
            temp_pos0.x = temp_pos.x;
            temp_pos0.y = temp_pos.y;
        }

        t += 0.00001;
    }
};

/**
 *
 * @param centerX
 * @param centerY
 * @param radius
 * @param fishPos {[]}
 * @param fishCount
 */
lkpy.MathAide.buildCircle = function (centerX, centerY, radius, fishPos, fishCount) {
    if (fishCount <= 0) {
        return;
    }

    var cellRadian = 2 * Math.PI / fishCount; // 每两个点之间的弧度

    for (var i = 0; i < fishCount; ++i) {
        fishPos[i] = cc.v2();
        fishPos[i].x = centerX + radius * Math.cos(i * cellRadian);
        fishPos[i].y = centerY + radius * Math.sin(i * cellRadian);
    }
};

lkpy.MathAide.buildCircleWithAngle = function (center_x, center_y, radius, fish_pos, fish_count, rotate, rotate_speed) {
    if (fish_count <= 0) {
        return;
    }

    var cell_radian = 2 * Math.PI / fish_count; // 每两个点之间的弧度

    var last_pos = cc.v2();
    // 这里计算好像有问题
    for (var i = 0; i < fish_count; ++i) {
        last_pos.x = center_x + radius * Math.cos(i * cell_radian + rotate + rotate_speed);
        last_pos.y = center_y + radius * Math.sin(i * cell_radian + rotate + rotate_speed);

        fish_pos[i] = lkpy.FPointAngle();
        fish_pos[i].x = center_x + radius * Math.cos(i * cell_radian + rotate);
        fish_pos[i].y = center_y + radius * Math.sin(i * cell_radian + rotate);
        var temp_dis = lkpy.MathAide.calcDistance(fish_pos[i].x, fish_pos[i].y, last_pos.x, last_pos.y);
        if (temp_dis != 0.0) {
            var temp_value = (fish_pos[i].x - last_pos.x) / temp_dis;
            if ((fish_pos[i].y - last_pos.y) >= 0.0) {
                fish_pos[i].angle = Math.acos(temp_value);
            } else {
                fish_pos[i].angle = -Math.acos(temp_value);
            }
        } else {
            fish_pos[i].angle = 2 * Math.PI;
        }
    }
};

lkpy.MathAide.buildBezier2 = function(p1, cp, p2, fish_count, fish_pos){
    //const [x1, y1] = p1;
    //const [cx, cy] = cp;
    //const [x2, y2] = p2;

    const x1 = p1.x1;
    const y1 = p1.y1;
    const cx = p1.cx;
    const cy = p1.cy;
    const x2 = p1.x2;
    const y2 = p1.y2;

    for(let i=0; i<fish_count; ++i){
        let t = i/(fish_count-1)

        fish_pos[i] = cc.v2();
        fish_pos[i].x = (1 - t) * (1 - t) * x1 + 2 * t * (1 - t) * cx + t * t * x2;
        fish_pos[i].y = (1 - t) * (1 - t) * y1 + 2 * t * (1 - t) * cy + t * t * y2;
    }
};


lkpy.MathAide.buildBezier2 = function(p1, cp, p2, fish_count, fish_pos){
    // const [x1, y1] = p1;
    // const [cx, cy] = cp;
    // const [x2, y2] = p2;
    const x1 = p1.x1;
    const cx = p1.cx;
    const x2 = p1.x2;

    for(let i=0; i<fish_count; ++i){
        let t = i/(fish_count-1)

        fish_pos[i] = cc.v2();
        fish_pos[i].x = (1 - t) * (1 - t) * x1 + 2 * t * (1 - t) * cx + t * t * x2;
        fish_pos[i].y = (1 - t) * (1 - t) * y1 + 2 * t * (1 - t) * cy + t * t * y2;
    }
};

lkpy.MathAide.buildBezier3 = function(p1, cp1, cp2, p2, fish_count, fish_pos){
    // const [x1, y1] = p1;
    // const [x2, y2] = p2;
    // const [cx1, cy1] = cp1;
    // const [cx2, cy2] = cp2;
    const x1 = p1.x1;
    const y1 = p1.y1;
    const cx1 = p1.cx1;
    const cy1 = p1.cy1;
    const cx2 = p1.cx2;
    const cy2 = p1.cy2;
    const x2 = p1.x2;
    const y2 = p1.y2;

    for(let i=0; i<fish_count; ++i){
        let t = i/(fish_count-1)

        fish_pos[i] = cc.v2();
        fish_pos[i].x = x1 * (1 - t) * (1 - t) * (1 - t) + 3 * cx1 * t * (1 - t) * (1 - t) + 3 * cx2 * t * t * (1 - t) + x2 * t * t * t;;
        fish_pos[i].y = y1 * (1 - t) * (1 - t) * (1 - t) + 3 * cy1 * t * (1 - t) * (1 - t) + 3 * cy2 * t * t * (1 - t) + y2 * t * t * t;
    }
};

lkpy.MathAide.twoBezier = function(t, p1, cp, p2) {
    // const [x1, y1] = p1;
    // const [cx, cy] = cp;
    // const [x2, y2] = p2;
    const x1 = p1.x1;
    const y1 = p1.y1;
    const cx = p1.cx;
    const cy = p1.cy;
    const x2 = p1.x2;
    const y2 = p1.y2;

    let x = (1 - t) * (1 - t) * x1 + 2 * t * (1 - t) * cx + t * t * x2;
    let y = (1 - t) * (1 - t) * y1 + 2 * t * (1 - t) * cy + t * t * y2;
    return [x, y];
};

lkpy.MathAide.threeBezier = function(t, p1, cp1, cp2, p2) {
    // const [x1, y1] = p1;
    // const [x2, y2] = p2;
    // const [cx1, cy1] = cp1;
    // const [cx2, cy2] = cp2;
    const x1 = p1.x1;
    const y1 = p1.y1;
    const cx1 = p1.cx1;
    const cy1 = p1.cy1;
    const cx2 = p1.cx2;
    const cy2 = p1.cy2;
    const x2 = p1.x2;
    const y2 = p1.y2;

    let x = x1 * (1 - t) * (1 - t) * (1 - t) + 3 * cx1 * t * (1 - t) * (1 - t) + 3 * cx2 * t * t * (1 - t) + x2 * t * t * t;
    let y = y1 * (1 - t) * (1 - t) * (1 - t) + 3 * cy1 * t * (1 - t) * (1 - t) + 3 * cy2 * t * t * (1 - t) + y2 * t * t * t;
    return cc.v2(x, y);
};

//07-01匀速贝塞尔
//根据t推导出匀速运动自变量t'的方程(使用牛顿切线法)
lkpy.MathAide.beze_even = function (t, totalLen, p0, p1, p2, p3)
{
	let len = t*totalLen
    let t1=t
    let t2
    let cc = 0
    while(true)  
    {  
		t2 = t1 - (this.beze_length(t1, p0, p1, p2, p3)-len)/this.beze_speed(t1, p0, p1, p2, p3)
        cc++
        if(Math.abs(t1-t2)<0.0000001) 
            break
        if(cc >= 1000){
            break
        }
        t1=t2

    }   
 
	return t2
};

//长度方程,使用Simpson积分算法
lkpy.MathAide.beze_length = function(t, p0, p1, p2, p3)
{
    let TOTAL_SIMPSON_STEP= 1000
    
	let stepCounts = Math.floor(TOTAL_SIMPSON_STEP*t)
 
	if(stepCounts & 1) stepCounts++;
 
	if(stepCounts==0) return 0.0;
 
	let halfCounts = stepCounts/2;
	let sum1=0.0, sum2=0.0;
	let dStep = t/stepCounts;
 
	for(let i=0; i<halfCounts; i++){
        sum1 += this.beze_speed((2*i+1)*dStep, p0, p1, p2, p3)
        if(i!=0)
            sum2 += this.beze_speed((2*i)*dStep, p0, p1, p2, p3)
    }
		
 
	//for(let i=1; i<halfCounts; i++)
		
 
	return (this.beze_speed(0.0, p0, p1, p2, p3)+this.beze_speed(1.0, p0, p1, p2, p3)+2*sum2+4*sum1)*dStep/3.0;
};

lkpy.MathAide.beze_speed = function(t, p0, p1, p2, p3)
{
	let sx = this.beze_speed_x(t, p0, p1, p2, p3);
	let sy = this.beze_speed_y(t, p0, p1, p2, p3);

    return Math.sqrt(sx*sx+sy*sy);
};

lkpy.MathAide.beze_speed_x = function(t, p0, p1, p2, p3)
{
	let it = 1-t;
	return -3*p0.x*it*it + 3*p1.x*it*it - 6*p1.x*it*t + 6*p2.x*it*t - 3*p2.x*t*t + 3*p3.x*t*t;
};

lkpy.MathAide.beze_speed_y = function(t, p0, p1, p2, p3)
{
	let it = 1-t;
	return -3*p0.y*it*it + 3*p1.y*it*it - 6*p1.y*it*t + 6*p2.y*it*t - 3*p2.y*t*t + 3*p3.y*t*t;
};

lkpy.MathAide.beze_x = function(t, p0, p1, p2, p3)
{
    let it = 1-t;
	return it*it*it*p0.x + 3*it*it*t*p1.x + 3*it*t*t*p2.x + t*t*t*p3.x;
};
 
lkpy.MathAide.beze_y = function(t, p0, p1, p2, p3)
{
	let it = 1-t;
	return it*it*it*p0.y + 3*it*it*t*p1.y + 3*it*t*t*p2.y + t*t*t*p3.y;
};

//2阶
lkpy.MathAide.beze_even2 = function (t, totalLen, p0, p1, p2)
{
	let len = t*totalLen
    let t1=t
    let t2
    let cc = 0
    while(true)  
    {  
		t2 = t1 - (this.beze_length2(t1, p0, p1, p2)-len)/this.beze_speed2(t1, p0, p1, p2)
 
        // if(Math.abs(t1-t2)<0.0000001) 
        //     break
        cc++
        if(Math.abs(t1-t2)<0.0000001) 
            break
        if(cc >= 1000){
            break
        }
		t1=t2
    }   
 
	return t2
};

lkpy.MathAide.beze_length2 = function(t, p0, p1, p2)
{
	let TOTAL_SIMPSON_STEP= 1000
 
	let stepCounts = Math.floor(TOTAL_SIMPSON_STEP*t)
 
	if(stepCounts & 1) stepCounts++;
 
	if(stepCounts==0) return 0.0;
 
	let halfCounts = stepCounts/2;
	let sum1=0.0, sum2=0.0;
	let dStep = t/stepCounts;
 
    for(let i=0; i<halfCounts; i++){
        sum1 += this.beze_speed2((2*i+1)*dStep, p0, p1, p2)
        if(i!=0)
            sum2 += this.beze_speed2((2*i)*dStep, p0, p1, p2)
    }

	// for(let i=0; i<halfCounts; i++)
	// 	sum1 += this.beze_speed2((2*i+1)*dStep, p0, p1, p2);
 
	// for(let i=1; i<halfCounts; i++)
	// 	sum2 += this.beze_speed2((2*i)*dStep, p0, p1, p2)
 
	return (this.beze_speed2(0.0, p0, p1, p2)+this.beze_speed2(1.0, p0, p1, p2)+2*sum2+4*sum1)*dStep/3.0;
};

lkpy.MathAide.beze_speed2 = function(t, p0, p1, p2)
{
	let sx = this.beze_speed_x2(t, p0, p1, p2);
	let sy = this.beze_speed_y2(t, p0, p1, p2);

    return Math.sqrt(sx*sx+sy*sy);
};

lkpy.MathAide.beze_speed_x2 = function(t, p0, p1, p2)
{
	let it = 1-t;
	return -2*p0.x*it + 2*p1.x*it - 2*p1.x*t + 2*p2.x*t
};

lkpy.MathAide.beze_speed_y2 = function(t, p0, p1, p2)
{
	let it = 1-t;
	return -2*p0.y*it + 2*p1.y*it - 2*p1.y*t + 2*p2.y*t
};

lkpy.MathAide.beze_x2 = function(t, p0, p1, p2)
{
    let it = 1-t;
	return it*it*p0.x + 2*t*it*p1.x + t*t*p2.x
};
 
lkpy.MathAide.beze_y2 = function(t, p0, p1, p2)
{
	let it = 1-t;
	return it*it*p0.y + 2*t*it*p1.y + t*t*p2.y
};

//4阶
lkpy.MathAide.beze_even4 = function (t, totalLen, p0, p1, p2, p3, p4)
{
	let len = t*totalLen
    let t1=t
    let t2
    let cc = 0
    while(true)  
    {  
		t2 = t1 - (this.beze_length2(t1, p0, p1, p2, p3, p4)-len)/this.beze_speed2(t1, p0, p1, p2, p3, p4)
 
        // if(Math.abs(t1-t2)<0.0000001) 
        //     break
        cc++
        if(Math.abs(t1-t2)<0.0000001) 
            break
        if(cc >= 100000){
            break
        }
		t1=t2
    }   
 
	return t2
};

lkpy.MathAide.beze_length4 = function(t, p0, p1, p2, p3, p4)
{
	let TOTAL_SIMPSON_STEP= 1000
 
	let stepCounts = Math.floor(TOTAL_SIMPSON_STEP*t)
 
	if(stepCounts & 1) stepCounts++;
 
	if(stepCounts==0) return 0.0;
 
	let halfCounts = stepCounts/2;
	let sum1=0.0, sum2=0.0;
	let dStep = t/stepCounts;
 
    for(let i=0; i<halfCounts; i++){
        sum1 += this.beze_speed2((2*i+1)*dStep, p0, p1, p2, p3, p4)
        if(i!=0)
            sum2 += this.beze_speed2((2*i)*dStep, p0, p1, p2, p3, p4)
    }
 
	return (this.beze_speed2(0.0, p0, p1, p2, p3, p4)+this.beze_speed2(1.0, p0, p1, p2, p3, p4)+2*sum2+4*sum1)*dStep/3.0;
};

lkpy.MathAide.beze_speed4 = function(t, p0, p1, p2, p3, p4)
{
	let sx = this.beze_speed_x4(t, p0, p1, p2, p3, p4)
	let sy = this.beze_speed_y4(t, p0, p1, p2, p3, p4)

    return Math.sqrt(sx*sx+sy*sy);
};

lkpy.MathAide.beze_speed_x4 = function(t, p0, p1, p2, p3, p4)
{
	let it = 1-t;
	return -4*p0.x*it*it*it + 4*p1.x*it*it*it - 8*p1.x*it*it*t + 16*p2.x*it*it*t - 16*p2.x*it*t*t + 8*p3.x*it*t*t - 8*p3.x*t*t*t + 4*p4.x*t*t*t
};

lkpy.MathAide.beze_speed_y4 = function(t, p0, p1, p2, p3, p4)
{
	let it = 1-t;
	return -4*p0.y*it*it*it + 4*p1.y*it*it*it - 8*p1.y*it*it*t + 16*p2.y*it*it*t - 16*p2.y*it*t*t + 8*p3.y*it*t*t - 8*p3.y*t*t*t + 4*p4.y*t*t*t
};

lkpy.MathAide.beze_x4 = function(t, p0, p1, p2, p3, p4)
{
    let it = 1-t;
	return it*it*it*it*p0.x + 4*it*it*it*t*p1.x + 4*it*it*t*t*p2.x + 4*it*t*t*t*p3.x + t*t*t*t*p4.x
};
 
lkpy.MathAide.beze_y4 = function(t, p0, p1, p2, p3, p4)
{
	let it = 1-t;
	return it*it*it*it*p0.y + 4*it*it*it*t*p1.y + 4*it*it*t*t*p2.y + 4*it*t*t*t*p3.y + t*t*t*t*p4.y
};

window.FPointAngle = lkpy.FPointAngle
window.MathAide = lkpy.MathAide