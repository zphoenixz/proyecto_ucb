/**
 * @param  Object | velocity  |
 * @param  Float  | angulo    | 
 * @return Object | 
 */

function rotacion(vel, angulo) {
    const VeldRotacion = {
        x: vel.x * Math.cos(angulo) - vel.y * Math.sin(angulo),
        y: vel.x * Math.sin(angulo) + vel.y * Math.cos(angulo)
    };

    return VeldRotacion;
}

/**
 * @param  Object | particula1 |
 * @param  Object | particula2 | 
 * @return Null | No returna nada
 */

function resolveCollision(particula1, particula2, controlador) {
    const DifVelX = particula1.velocity.x - particula2.velocity.x;
    const DifVelY = particula1.velocity.y - particula2.velocity.y;

    const xDist = particula2.x - particula1.x;
    const yDist = particula2.y - particula1.y;

    if (DifVelX * xDist + DifVelY * yDist >= 0) {
        const angulo = -Math.atan2(particula2.y - particula1.y, particula2.x - particula1.x);

        const m1 = particula1.mass;
        const m2 = particula2.mass;

        // velocidad antes de choque
        const u1 = rotacion(particula1.velocity, angulo);
        const u2 = rotacion(particula2.velocity, angulo);

        // velocidad despues del choque unidimensional
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        v1.x*=controlador;
        v2.y*=controlador;
        // velocidad final
        const vFinal1 = rotacion(v1, -angulo);
        const vFinal2 = rotacion(v2, -angulo);

        // lo que encontre para y puse para rebote realista
        particula1.velocity.x = vFinal1.x;
        particula1.velocity.y = vFinal1.y;

        particula2.velocity.x = vFinal2.x;
        particula2.velocity.y = vFinal2.y;
    }
}