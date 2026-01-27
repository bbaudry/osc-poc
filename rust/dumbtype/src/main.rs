use nannou::prelude::*;
use nannou::rand::random_range;
use nannou_osc as osc;


fn main() {
    nannou::app(model)
        // .loop_mode(LoopMode::loop_ntimes(242))
        .update(update)
        .simple_window(view)
        .run();
}

struct Model {  
    bulle:Bulle,
    grow:bool
}

struct Bulle {
    cx: f32,
    cy: f32,
    rayon: f32
}

fn model(_app: &App) -> Model {
    let b1 = Bulle{
        cx:0.0,
        cy:0.0,
        rayon:1.0
    };
    Model {
        bulle:b1,
        grow:true
    }
}

fn update(app: &App, model: &mut Model, _update: Update) {
    if model.grow && model.bulle.rayon<200.0 {model.bulle.rayon+=0.42}
}

fn view(app: &App, model: &Model, frame: Frame){
    let draw = app.draw();
    draw.background().color(BLACK);

    draw.ellipse()
        .color(hsl(350.0/360.0,1.0,0.5))
        .stroke_weight(1.0)
        .x_y(model.bulle.cx,model.bulle.cy)
        .radius(model.bulle.rayon);
// println!("puppy[{i}]: {puppy} ");
    draw.to_frame(app,&frame).unwrap();

}
