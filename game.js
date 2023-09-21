kaboom({
  global: true,
  fullscreen: true,
  scale: 1,
  debug: true,
  clearColor: [0, 0, 1, 1],
  sound: true
})

// Speeds
const MOVE_SPEED = 120
const SLICER_SPEED = 100
const SKELETOR_SPEED = 60

// Define player health
let playerHealth = 5; // You can set the initial health to any value you prefer
//sound
loadSound('Hit', 'sounds/Hit1.wav');
loadSound('Fireball', 'Fireball.mp3', (err) => {
  if (err) {
    console.error('Error loading fireball sound:', err);
  } else {
    console.log('fireball sound loaded successfully');
  }
});



// Game Logic
loadRoot('./sprites/');
loadSprite('link-going-left', '1Xq9biB.png')
loadSprite('link-going-right', 'yZIb8O2.png')
loadSprite('link-going-down', 'tVtlP6y.png')
loadSprite('link-going-up', 'UkV0we0.png')
loadSprite('left-wall', 'rfDoaa1.png')
loadSprite('top-wall', 'QA257Bj.png')
loadSprite('bottom-wall', 'vWJWmvb.png')
loadSprite('right-wall', 'SmHhgUn.png')
loadSprite('bottom-left-wall', 'awnTfNC.png')
loadSprite('bottom-right-wall', '84oyTFy.png')
loadSprite('top-left-wall', 'xlpUxIm.png')
loadSprite('top-right-wall', 'z0OmBd1.jpg')
loadSprite('top-door', 'U9nre4n.png')
loadSprite('fire-pot', 'I7xSp7w.png')
loadSprite('left-door', 'okdJNls.png')
loadSprite('lanterns', 'wiSiY09.png')
loadSprite('slicer', 'c6JFi5Z.png')
loadSprite('skeletor', 'Ei1VnX8.png')
loadSprite('kaboom', 'o9WizfI.png')
loadSprite('stairs', 'VghkL08.png')
loadSprite('bg', 'u4DVsx6.png')
loadSprite('chick', 'Idle (32x34).png')

scene('game', ({ level, score }) => {
  layers(['bg', 'obj', 'ui'], 'obj')

  const maps = [
    [
      'ycc)cc^ccw',
      'a        b',
      'a       * b',
      'a    (   b',
      '%       b',
      'a    (   b',
      'a   *   b',
      'a  *      b',
      'xdd)dd)ddz',
    ],
    [
      'yccccccccw',
      'a  }      b',
      ')        )',
      'a        b',
      'a        b',
      'a    $   b',
      ')   }  }  )',
      'a        b',
      'xddddddddz',
    ],
    [
      'yccccccc^w',
      'a        b',
      ')        )',
      'a        b',
      'a        b',
      'a        b',
      ')        )',
      'a        b',
      'xddddddddz',
    ],
    [
      'ycccccc^cw',
      'a        b',
      ')    ()  )',
      'a    ()  b',
      'a   (  )  b',
      'a        b',
      ')        )',
      'a        b',
      'xddddddddz',
    ],
    [
      'yccccc^cccw',
      'a  }      b',
      ')         )',
      'a         b',
      'a         b',
      'a         b',
      ')         )',
      'a       } b',
      'xddddddddz',
    ],
    [
      'ycc)cc^ccw',
      'a ( { }   b',
      ')   *    )',
      'a    b',
      'a     b',
      'a  }   {  b',
      ')   *    )',
      'a         b',
      'xddddddddz',
    ],
  ]

  const levelCfg = {
    width: 48,
    height: 48,
    a: [sprite('left-wall'), solid(), 'wall'],
    b: [sprite('right-wall'), solid(), 'wall'],
    c: [sprite('top-wall'), solid(), 'wall'],
    d: [sprite('bottom-wall'), solid(), 'wall'],
    w: [sprite('top-right-wall'), solid(), 'wall'],
    x: [sprite('bottom-left-wall'), solid(), 'wall'],
    y: [sprite('top-left-wall'), solid(), 'wall'],
    z: [sprite('bottom-right-wall'), solid(), 'wall'],
    '%': [sprite('left-door'), solid(), 'door'],
    '^': [sprite('top-door'), 'next-level'],
    $: [sprite('stairs'), 'next-level'],
    '*': [sprite('slicer'), 'slicer', { dir: -1 }, 'dangerous'],
    '}': [sprite('skeletor'), 'dangerous', 'skeletor', { dir: -1 }],
    ')': [sprite('lanterns'), solid(), 'wall'],
    '(': [sprite('fire-pot'), solid()],
    
  }
  addLevel(maps[level], levelCfg)

  add([sprite('bg'), layer('bg')])

  const scoreLabel = add([
    text('score: '+'0'),
    pos(400, 500),
    layer('ui'),
    {
      value: score,
    },
    scale(2),
  ])

  const healthLabel = add([
    text('Health: ' + playerHealth, 18),
    pos(12, 450),
    layer('ui'),
    {
      value: playerHealth,
    },
  ]);

  const controlLabel = add([
    text('press arrow keys to move and space bar to attack!'),
    pos(15,650),
    layer('ui'),
    
    
  ])

  add([text('level ' + parseInt(level + 1)), pos(400, 465), scale(2)])

  const player = add([
    sprite('link-going-right'),
    pos(5, 190),
    {
      // right by default
      dir: vec2(1, 0),
    },
  ])

  player.action(() => {
    player.resolve()
  })

  player.overlaps('next-level', () => {
    go('game', {
      level: (level + 1) % maps.length,
      score: scoreLabel.value,
    })
  })

  keyDown('left', () => {
    player.changeSprite('link-going-left')
    player.move(-MOVE_SPEED, 0)
    player.dir = vec2(-1, 0)
  })

  keyDown('right', () => {
    player.changeSprite('link-going-right')
    player.move(MOVE_SPEED, 0)
    player.dir = vec2(1, 0)
  })

  keyDown('up', () => {
    player.changeSprite('link-going-up')
    player.move(0, -MOVE_SPEED)
    player.dir = vec2(0, -1)
    
  })

  keyDown('down', () => {
    player.changeSprite('link-going-down')
    player.move(0, MOVE_SPEED)
    player.dir = vec2(0, 1)
  })

  function spawnKaboom(p) {
    const obj = add([sprite('kaboom'), pos(p), 'kaboom'])
    wait(0.1, () => {
      destroy(obj)
    })
  }

  keyPress('space', () => {
    console.log('Playing Fireball sound');
  play('Fireball', {volume:1});
  spawnKaboom(player.pos.add(player.dir.scale(48)));
  console.log('Fireball');
  })

  player.collides('door', (d) => {
    destroy(d)
  })

  collides('kaboom', 'skeletor', (k, s) => {
    camShake(4)
    wait(1, () => {
      destroy(k)
    })
    destroy(s)
    scoreLabel.value++
    scoreLabel.text = scoreLabel.value
  })

  action('slicer', (s) => {
    s.move(s.dir * SLICER_SPEED, 0)
  })

  collides('slicer', 'wall', (s) => {
    s.dir = -s.dir
  })

  action('skeletor', (s) => {
    const playerInRange = s.pos.dist(player.pos) < 200;

    if (playerInRange) {
      // Find the player's position
      const playerPos = player.pos.clone();

      // Calculate the direction vector towards the player
      const dirToPlayer = playerPos.sub(s.pos).unit();

      // Move in the direction of the player
      s.move(dirToPlayer.scale(SKELETOR_SPEED));
    } else {
      // If the player is not in sight, change direction at random intervals
      if (s.timer <= 0) {
        s.dir = rand(1) < 0.5 ? 1 : -1; // Randomly choose a new direction
        s.timer = rand(5);
      } else {
        // Continue moving in the current direction
        s.move(0, s.dir * SKELETOR_SPEED);
        s.timer -= dt();
      }
    }
  })

  collides('skeletor', 'wall', (s) => {
    s.dir = -s.dir
  })
  collides('skeletor', 'lanterns', (s) => {
    s.dir = -s.dir
  })
// Player damage handling
let canTakeDamage = true; // A flag to control damage cooldown
let isInvulnerable = false; // Flag to track player's invulnerability state
const DAMAGE_COOLDOWN = 2; // Cooldown duration in seconds



  player.overlaps('dangerous', (s) => {
    if (canTakeDamage && !isInvulnerable) {
      playerHealth--; // Reduce player health by 1 when touched
      canTakeDamage = false; // Start cooldown
      isInvulnerable = true; // Set player as invulnerable
      healthLabel.text = 'Health: ' + playerHealth; // Update health label
  

      // Change the player's color to red when damaged
      player.color = rgb(1, 0, 0);
      //sound when hit
      play('Hit')

      // Create a color flickering effect for 2 seconds
    every(0.1, () => {
      flickerPlayerColor();
    });
    
     // After the cooldown, reset the flag, player color, and invulnerability state
    wait(DAMAGE_COOLDOWN, () => {
      canTakeDamage = true;
      isInvulnerable = false;
      player.color = rgb(1, 1, 1); // Reset player color to white
      });
    }

    // Check if the player has run out of health
    if (playerHealth <= 0) {
      // If health is zero, it's game over
      go('lose', { score: scoreLabel.value });
    }
  });
})

scene('lose', ({ score }) => {
  add([text(score, 32), origin('center'), pos(width() / 2, height() / 2)]);
})

start('game', { level: 0, score: 0 })
