<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    
    <title>GameOne</title>
    
    <style>
    	* { padding: 0; margin: 0; }
    	canvas {background : #000000 ; ;; display: block; margin: 0 auto; }
    	h1 {text-align: center;}
    </style>
</head>

<body>

    <h1>Scooby DEMO</h1>
    <h1>Zbierz wszystkie Scooby Chrupki i nie daj sie pokonac duchom!</h1>
    
    <canvas id="gra" width="1280px" height="580px"></canvas>

    <script>
        var can = document.getElementById('gra');
        var ctx = can.getContext('2d');
        var GrafikaPlatformy = new Image();
        GrafikaPlatformy.src = 'stopnie.png'
        var plat = [];
        plat[0] = new Platforma(0, 500, 550, 80);
        plat[1] = new Platforma(600, 200, 80, 30);
        plat[2] = new Platforma(100, 250, 80, 30);
        plat[3] = new Platforma(240, 360, 80, 30);
        plat[4] = new Platforma(500, 430, 80, 30);
        plat[5] = new Platforma(380, 180, 80, 30);
        plat[6] = new Platforma(730, 300, 80, 30);
        plat[7] = new Platforma(670, 100, 80, 30);
        plat[8] = new Platforma(1000, 390, 80, 30);
        plat[9] = new Platforma(150, 70, 80, 30);
        plat[10] = new Platforma(1160, 320, 80, 30);
        plat[11] = new Platforma(910, 160, 80, 30);
        plat[12] = new Platforma(500, 500, 500, 80);
        plat[13] = new Platforma(800, 500, 500, 80);
        var GrafikaMonety = new Image();
        GrafikaMonety.src = 'chrupka.png';
        var mon = [];
        mon [0] = new Moneta (150, 190, 45, 50);
        mon [1] = new Moneta (270, 300, 45, 50);
        mon [2] = new Moneta (530, 330, 45, 50);
        mon [3] = new Moneta (410, 120, 45, 50);
        mon [4] = new Moneta (760, 240, 45, 50);
        mon [5] = new Moneta (700, 40, 45, 50);
        mon [6] = new Moneta (1030, 330, 45, 50);
        mon [7] = new Moneta (180, 30, 45, 50);
        mon [8] = new Moneta (1190, 40, 45, 50);
        var przesz = [];
        przesz[0] = new Przeszkoda(95, 175, 70, 70, 10, 'duch.png');
        przesz[1] = new Przeszkoda(530, 380, 80, 80, 10, 'duch.png');
        przesz[2] = new Przeszkoda(160, 400, 80, 80, 10, 'duch.png');
        przesz[3] = new Przeszkoda(980, 420, 70, 70, 10, 'duch.png');
        przesz[4] = new Przeszkoda(650, 120, 70, 70, 10, 'duch.png');
        przesz[5] = new Przeszkoda(705, 205, 70, 70, 10, 'duch.png');
        przesz[6] = new Przeszkoda(300, 215, 80, 80, 10, 'duch.png');
        var GrafikaPostaci = new Image();
        GrafikaPostaci.src = 'scooby.png'
        var xPos = 10;
        var yPos = 20;
        var szerPos = 100;
        var wysPos = 100; 
        var hp = 50; 
        var wysSkok = 160;
        var licznik = 0;
        
        function rysuj()
        {
            ctx.clearRect(0,0,can.width,can.height);
            rysujplatformy();
            rysujmonety();
            rysujprzeszkody();
            ctx.drawImage(GrafikaPostaci, xPos, yPos, szerPos, wysPos);
            rysujHP();
            grawitacja();
            xPos = xPos + dx;
            kolizjaZMoneta();
            kolizjaZPrzeszkoda();
            czyKoniec();
        }  
        
        function Platforma (px, py, pszer, pwys)
        {
            this.x = px;
            this.y = py;
            this.szer = pszer;
            this.wys = pwys;
        }
    
        function rysujplatformy()
        {
            for (var i = 0;i<plat.length;i++)
            {
                ctx.drawImage(GrafikaPlatformy, plat[i].x, plat[i].y, plat[i].szer, plat[i].wys);
            }
            
         }  
         
        function Moneta (px, py, pszer, pwys)
        {
            this.x = px;
            this.y = py;
            this.szer = pszer;
            this.wys = pwys;
            this.czywidoczna = true;
        }
        
        function rysujmonety()
        {
            for (var i = 0;i<mon.length;i++)
            {
                if (mon[i].czywidoczna == true)
                {
                    ctx.drawImage(GrafikaMonety, mon[i].x, mon[i].y, mon[i].szer, mon[i].wys)
                }
            }
        }
        
         function Przeszkoda (px, py, pszer, pwys, pzabiera, pnazwa)
        {
            this.x = px;
            this.y = py;
            this.szer = pszer;
            this.wys = pwys;
            this.czywidoczna = true;
            this.zabiera = pzabiera;
            this.GrafikaPrzeszkody = new Image();
            this.GrafikaPrzeszkody.src = pnazwa; 
        }
        
        function rysujprzeszkody()
        {
        
            for (var i = 0;i<przesz.length;i++)
            {
                
                if (przesz[i].czywidoczna == true)
                {
                    ctx.drawImage(przesz[i].GrafikaPrzeszkody, przesz[i].x, przesz[i].y, przesz[i].szer, przesz[i].wys);
                }
            }
        }
        
        function rysujHP()
        {
            ctx.font = "20px Arial";
            ctx.fillStyle = "red";
            ctx.fillText("HP: "+hp, 30, 30);
        }
        
        var dy = 0;
        function grawitacja()
        {
            if (dy >= 0)
            {
                        dy = 3;
            for (var i=0; i<plat.length; i++)
            {
                if(
                 yPos + wysPos > plat[i].y &&
                 yPos + 0.95*wysPos < plat[i].y &&
                 xPos + szerPos/2 > plat[i].x &&
                 xPos + szerPos/2 <plat[i].x + plat[i].szer)
                {
                    dy = 0;
                }
            }
            }
             else
            {
                licznik = licznik + 3;
                if (licznik >= wysSkok)
                {
                    dy = 0;
                    licznik = 0;
                }
            }
            yPos = yPos + dy;
        }
        
        document.addEventListener('keydown', ruchPostaci, false);
        var dx = 0;
        function ruchPostaci(e)
        {
            if (e.keyCode == 37)
            {
                dx = -2;
            }
            else if (e.keyCode == 39)
            {
                dx = 2;
            }
            else if(e.keyCode == 38 && dy == 0)
            {
                dy = -3;
            }
        }
        
        document.addEventListener('keyup', stop, false);
        function stop(e)
        {
            if(e.keyCode == 39)
            {
                dx = 0;
            }
            else if(e.keyCode == 37)
            {
                dx = 0;
            }
        }
        function kolizjaZMoneta()
        {
            for (var i=0; i<mon.length; i++)
            {
                if(
                yPos < mon[i].y + mon[i].wys/2 &&
                yPos + wysPos > mon[i].y + mon[i].wys/2 &&
                xPos < mon[i].x + mon[i].szer/2 &&
                xPos + szerPos > mon[i].x + mon[i].szer/2)
                {
                    mon[i].czywidoczna = false; 
                }
            }
        }
        
        function kolizjaZPrzeszkoda()
        {
            for (var i=0; i<przesz.length; i++)
            {
                if(
                yPos < przesz[i].y + przesz[i].wys/2 &&
                yPos + wysPos > przesz[i].y + przesz[i].wys/2 &&
                xPos < przesz[i].x + przesz[i].szer/2 &&
                xPos + szerPos > przesz[i].x + przesz[i].szer/2 &&
                przesz[i].czywidoczna == true)
                {
                    przesz[i].czywidoczna = false;
                    hp = hp - przesz[i].zabiera;
                    if (hp <= 0)
                    {
                        location.reload();
                    }
                }
            }
        }
       
        function czyKoniec()
        {
            czySaMonety = false;
            for (var i=0; i<mon.length; i++)
            {
                if(mon[i].czywidoczna == true)
                {
                czySaMonety = true;
                }
            }
            if (czySaMonety == false)
            {
                ctx.clearRect(0,0,can.width,can.height);
                ctx.font = "120px Georgia"
                ctx.fillText("WYGRYWASZ", 200, 300)
            }
        }
        
        setInterval(rysuj, 10);
    </script>

</body>

</html>
