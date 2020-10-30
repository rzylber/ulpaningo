import React, { useState, useEffect } from 'react';

import axios from 'axios';

import styled from 'styled-components';

const translations = [['en', 'English'], ['pt_br', 'Português (BR)']];

const localization = {
    'present': {
        'en': 'Present',
        'pt_br': 'Presente',
    }
}

export default () => {

    const [verbs, setVerbs] = useState(null);
    const [translation, setTanslation] = useState('en');

    useEffect(() => {
        async function getVerbs() {
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/poal/test`);
            setVerbs(data.verbs);
        }
        getVerbs();
    }, []);

    const ifNikkud = (verb, label) => {
        if (verb[`${label}_n`]) return verb[`${label}_n`];
        return verb[`${label}`]
    }

    const localize = (term) => {
        return term[translation] ? term[translation] : term['en'];
    }

    return (
        <div>
            <p>ULPANINGO</p>
            {verbs && <Hebrew>
                <StyledTable>

                    <thead>
                        <tr>
                            <th>
                                <StyledSelect onChange={(e) => setTanslation(e.target.value)} value={translation}>
                                    {translations.map(([code, text]) => <option key={code} value={code}>{text}</option>)}
                                </StyledSelect>
                            </th>
                            <th colspan="4">{localize(localization['present'])}</th>
                            <th colspan="3"></th>
                        </tr>
                    </thead>

                    <thead>
                        <tr>
                            <th>
                                תרגום
                            </th>
                            <th>רבות</th>
                            <th>רבים</th>
                            <th>נקבה</th>
                            <th>זכר</th>
                            <th>מ׳׳י</th>
                            <th>שורש</th>
                            <th>ש׳׳פ</th>
                        </tr>
                    </thead>

                    <tbody>

                        {verbs.map(verb => <tr key={verb.id}>
                            <td>{localize(verb.translations)}</td>
                            {[4, 3, 2, 1].map(num => <td key={num}>{ifNikkud(verb, `pr_${num}`)}</td>)}
                            <td>{verb.prep}</td>
                            <td><strong>{verb.root.split('').join('.')}</strong></td>
                            <td><strong>{ifNikkud(verb, 'shem_poal')}</strong></td>
                        </tr>)}

                    </tbody>

                </StyledTable>
            </Hebrew>}
        </div>
    );
}

const Hebrew = styled.span`
    font-face: ezra_sil;
    font-size: 22px;
`;

const StyledTable = styled.table`
    margin: 0 auto;
    width: 50%;
    min-width: 800px;
    border: 1px solid #333;
    td {
        border: 1px solid #333;
        text-align: center;
    }
    thead {
        background-color: #333;
        color: #fff;
    }
`;

const StyledSelect = styled.select`
    margin: 0 10px 5px 0;
`;