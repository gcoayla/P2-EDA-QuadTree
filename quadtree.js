class Point {
    constructor (x, y, userData ){
    this .x = x;
    this .y = y;
    this . userData = userData ;
    }
}
class Rectangle {
    constructor (x, y, w, h){
    this .x = x; // center
    this .y = y;
    this .w = w; // half width
    this .h = h; // half height
    }
    // verifica si este objeto contiene un objeto Punto
    contains ( point ){
        if((point.x<=this.x+this.w && point.x>=this.x-this.w) && (point.y<=this.y+this.h && point.y>=this.y-this.h)){
            return true;
        }else{
            return false;
        }
    }
    // verifica si este objeto se intersecta con otro objeto Rectangle
    intersects ( range ){
        if(range.x-range.w > this.x+this.w || range.x+this.w < this.x-this.w || range.y-range.h > this.y+this.h || range.y+this.h < this.y-this.h){
            return false;
        }else{
            return true;
        }
    }
}
class QuadTree {
    constructor ( boundary , n){
        this . boundary = boundary ; // Rectangle
        this . capacity = n; // capacidad maxima de cada cuadrante
        this . points = []; // vector , almacena los puntos a almacenar
        this . divided = false ;
    }
    subdivide () {
        // Algoritmo
        // 1: Crear 4 hijos : qt_northeast , qt_northwest , qt_southeast , qt_southwest
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;
        let ne = new Rectangle(x+w/2 , y-h/2 , w/2 , h/2);
        let nw = new Rectangle(x-w/2 , y-h/2 , w/2 , h/2);
        let se = new Rectangle(x+w/2 , y+h/2 , w/2 , h/2);
        let sw = new Rectangle(x-w/2 , y+h/2 , w/2 , h/2);
        let qt_northeast = new QuadTree(ne,this.capacity);
        let qt_northwest = new QuadTree(nw,this.capacity);
        let qt_southeast = new QuadTree(se,this.capacity);
        let qt_southwest = new QuadTree(sw,this.capacity);
        this . northeast = qt_northeast;
        this . northwest = qt_northwest;
        this . southeast = qt_southeast;
        this . southwest = qt_southwest;
        this.divided=true;
    }
    insert ( point ){
        if(!this.boundary.contains(point)){
            return
        }
        if(this.points.length<this.capacity){
            this.points.push(point);
        }else{
            if(!this.divided){
                this.subdivide();
            }
            this . northeast . insert ( point );
            this . northwest . insert ( point );
            this . southeast . insert ( point );
            this . southwest . insert ( point );
        }
    }
    query(range,found){
        if(!this.boundary.intersects(range)){
            return;
        }
        for(var i=0;i<this.points.length;i++){
            count++;
            if(range.contains(this.points[i])){
                found.push(this.points[i]);
            }
        }
        if(this.divided){
            this.northeast.query(range,found);
            this.northwest.query(range,found);
            this.southeast.query(range,found);
            this.southwest.query(range,found);
        }
    }
    show () {
        stroke (255) ;
        strokeWeight (1) ;
        noFill () ;
        rectMode ( CENTER );
        rect ( this . boundary .x, this . boundary .y, this . boundary .w*2 , this . boundary .h *2) ;
        if( this . divided ){
        this . northeast . show () ;
        this . northwest . show () ;
        this . southeast . show () ;
        this . southwest . show () ;
        }
        for (let p of this . points ){
        strokeWeight (4) ;
        point (p.x, p.y);
        }
    }
}  