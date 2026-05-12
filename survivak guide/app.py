from flask import Flask, render_template, request, session, redirect, url_for

app = Flask(__name__)
app.secret_key = 'secreto_upq_2026'

@app.route('/', methods=['GET', 'POST'])
def index():
    if 'nivel' not in session:
        session['nivel'] = 1

    error = None

    if request.method == 'POST':
        seccion = request.form.get('seccion')

        if seccion == 'reglas':
            q1 = request.form.get('q1_reglas')
            q2 = request.form.get('q2_reglas')
            chk = request.form.get('chk_reglas')
            
            if q1 == '80' and q2 == '10' and chk == 'on':
                session['nivel'] = max(session['nivel'], 2)
            else:
                error = "La Cámara de las Reglas: Respuestas incorrectas o no aceptaste el compromiso."

        elif seccion == 'notas':
            q1 = request.form.get('q1_notas')
            q2 = request.form.get('q2_notas')
            chk = request.form.get('chk_notas')
            
            if q1 == '40' and q2 == '50' and chk == 'on':
                session['nivel'] = max(session['nivel'], 3)
            else:
                error = "El Oráculo de las Notas: Respuestas incorrectas o no aceptaste el compromiso."

        elif seccion == 'skills':
            q1 = request.form.get('q1_skills')
            q2 = request.form.get('q2_skills')
            chk = request.form.get('chk_skills')
            
            if q1 == 'multi' and q2 == 'poo' and chk == 'on':
                session['nivel'] = max(session['nivel'], 4)
            else:
                error = "Skills a desbloquear: Respuestas incorrectas o no aceptaste el compromiso."

        elif seccion == 'tiempo':
            q1 = request.form.get('q1_tiempo')
            q2 = request.form.get('q2_tiempo')
            chk = request.form.get('chk_tiempo')
            
            if q1 == 'julio' and q2 == '17_agosto' and chk == 'on':
                session['nivel'] = max(session['nivel'], 5)
            else:
                error = "La Línea del Tiempo: Respuestas incorrectas o no aceptaste el compromiso."

        return redirect(url_for('index', error=error))

    error = request.args.get('error')
    return render_template('index.html', nivel=session['nivel'], error=error)

@app.route('/reset')
def reset():
    session.clear()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)