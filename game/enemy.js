var Enemy = function(scene, color, position, target, size) {
    this.scene = scene;
    this.position = position;
    this.life = 1;
    this.size = size;
    this.bullets = new Array();
    this.target = target;
    this.direction = 0;
    this.speed = 0;

    this.material = new THREE.MeshLambertMaterial({
        color: color,
    });

    var singleGeometry = new THREE.Geometry();

    vehiculeMesh = new THREE.ConeGeometry(5, 20, 32);
    this.graphic = new THREE.Mesh(vehiculeMesh, this.material);
    this.graphic.position.z = 6;
    this.graphic.position.x = position.x;
    this.graphic.position.y = position.y;

    this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), this.direction+(3*Math.PI/2));
};

Enemy.prototype.dead = function () {
    console.log("Enemy dead!");
    this.scene.remove(this.graphic);
}

Enemy.prototype.accelerate = function (distance) {
    var max = 2;

    this.speed += distance / 4;
    if (this.speed >= max) {
        this.speed = max;
    }
};

Enemy.prototype.decelerate = function (distance) {
    var min = -1;

    this.speed -= distance / 16;
    if (this.speed <= min) {
        this.speed = min;
    }
};

Enemy.prototype.displayInfo = function () {
    jQuery('#'+this.name+' >.life').text(this.life);
}

Enemy.prototype.turnRight = function (angle) {
    this.direction -= angle;
    this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), -angle);
};

Enemy.prototype.turnLeft = function (angle) {
    this.direction += angle;
    this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), angle);
};

Enemy.prototype.move = function () {
    var vectorX = this.target.position.x - this.position.x;
    var vectorY = this.target.position.y - this.position.y;
    var moveTo = new THREE.Vector3(
        0.0000001 * vectorX,
        0.0000001 * vectorY,
        this.graphic.position.z
    );

    this.position = moveTo;

    this.graphic.position.x = this.position.x;
    this.graphic.position.y = this.position.y;
};
