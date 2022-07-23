import * as SQLite from 'expo-sqlite';
import {SQLResultSet} from 'expo-sqlite';

const db = SQLite.openDatabase("places.db")

export const init = () => {
    return new Promise<void>((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
                [],
                () => {
                    resolve();
                },

                (_, err):any => {
                    reject(err);
                }
            );
        });
    });
};

export const insertPlace = (title:string, imageUri:string, address:string, lat:number, lng:number): Promise<SQLResultSet> => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);`,
                [title, imageUri, address, lat, lng],
                (_, result) => {
                    resolve(result);
                },
                (_, err): any  => {
                    reject(err);
                }
            );
        });
    });
};

export const fetchPlaces = (): Promise<SQLResultSet> => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM places',
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err): any => {
                    reject(err);
                }
            );
        });
    });
};