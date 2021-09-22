function init()
{
    // set some camera attributes
    var VIEW_ANGLE = 45,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 10000;

    $container = $('#container');
    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE,
                                    ASPECT,
                                    NEAR,
                                    FAR);
    scene = new THREE.Scene();
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    camera.position.z = 500;
    scene.add(camera);

    renderer.setSize(WIDTH, HEIGHT);

    $container.append(renderer.domElement);

    startX = 50;
    startY = 0;

    noGround = [];
    ground = new Ground(0xffffff, WIDTH, HEIGHT, 10);

    player1 = new Player("player1", 0xffff00, new THREE.Vector2(startX, startY), 0);
    scene.add(player1.graphic);
    scene.add(player1.c);

    light1 = new Light("sun", 0xffffff, "0,0,340");
    scene.add(light1);

    var nbEnemy = 6;
    player1.enemies = [];

    var step = 2 * Math.PI / nbEnemy;

    for (i = 0; i < nbEnemy; i++)
    {
        var eX = 200 * Math.cos(step * i) + startX;
        var eY = 200 * Math.sin(step * i) + startY;

        newE = new Enemy(scene, 0x00ffff, new THREE.Vector2(eX, eY), player1, 20);
        player1.enemies.push(newE);
        scene.add(newE.graphic);
    }
}

function Ground(color, size_x, size_y, nb_tile)
{
    ground = [];
    colors = Array(0xff0000, 0x00ff00, 0x0000ff, 0x000000);

    sizeOfTileX = size_x / nb_tile;
    minX = -(size_x/2);
    maxX = (size_x/2);
    
    sizeOfTileY = size_y / nb_tile;
    minY = -(size_y/2);
    maxY = (size_y/2);

    for (x = minX; x <= maxX; x = x+sizeOfTileX){
        for (y = minY; y <= maxY; y = y+sizeOfTileY){

            color = colors[Math.floor(Math.random()*colors.length)];

            if (startX >= x - sizeOfTileX / 2 && startX <= x + sizeOfTileX / 2 && startY >= y - sizeOfTileY / 2 && startY <= y + sizeOfTileY / 2)
            {
                color = colors[Math.floor(Math.random()*(colors.length-1))];
            }
       
            if (0x000000 != color)
            {
                tmpGround = new THREE.Mesh(
                new THREE.PlaneGeometry(sizeOfTileX-10, sizeOfTileY-10),
                new THREE.MeshLambertMaterial({color: color, transparent: true, opacity: 0.6}));
                tmpGround.position.x = x;
                tmpGround.position.y = y;
                scene.add(tmpGround);
                //ground.add([x, y, size])
            }
            else
                noGround.push([x, y]);
        }
    }

    return ground;
}

function Light(name, color, position)
{
    pointLight = new THREE.PointLight(color, 50, 2000);

    pointLight.position.x = position.split(',')[0];
    pointLight.position.y = position.split(',')[1];
    pointLight.position.z = position.split(',')[2];

    return pointLight;
}