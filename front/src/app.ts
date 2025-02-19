import express from 'express';
import path from 'path';
import { setRoutes } from './routes/index';
import { engine } from 'express-handlebars';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../public/views'));

setRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});