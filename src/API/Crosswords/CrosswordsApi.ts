import config from "../../config"
import axios, {AxiosResponse} from "axios";

export class CrosswordsApi {

    public static getCrossWords(year, month, day) {
        //
        // return Promise.resolve({
        //     "acrossmap": null,
        //     "admin": false,
        //     "answers": {
        //         "across": ["COAT", "TWAS", "TBIRD", "UHUH", "OHNO", "ERNIE", "RITE", "NAGS", "COOPS", "BOOMMICROPHONE", "ICKY", "RIM", "REMISS", "EYE", "ATM", "EMEND", "AMMO", "EPEE", "PERFORMMIRACLES", "ERGO", "HEIR", "TRUTH", "LYE", "FIN", "SLUSHY", "ION", "AREA", "IMFROMMISSOURI", "AGAIN", "AIDA", "OPEC", "HOWDO", "ITEM", "ZONE", "ARROW", "LYRE", "ENDS"],
        //         "down": ["CURB", "OHIO", "AUTO", "THEM", "TONICS", "WHACK", "ANGRY", "SOSO", "TECHIE", "BROOM", "INON", "RIPE", "DES", "MISDO", "PRYOR", "REPEL", "EMERY", "MERGE", "INFO", "EMIR", "APLUS", "TEETH", "MESHY", "AMEN", "MMI", "ECRU", "RHINO", "ATLAS", "FORNOW", "SESAME", "IFIDO", "AMITY", "RIDER", "IGOR", "MAWR", "MAIL", "OOZE", "UPON", "REND", "ICES", "AHA"]
        //     },
        //     "author": "Manny Nosowsky",
        //     "autowrap": null,
        //     "bbars": null,
        //     "circles": null,
        //     "clues": {
        //         "across": ["1. Jacket", "5. '___ the night before ...'", "9. Popular Ford auto, informally", "14. Slangy denial", "15. Cry before disaster", "16. Singer Ford from Tennessee", "17. Ceremonial act", "18. Complains and complains and ...", "19. Good places for hen parties?", "20. Voice amplifier on a pole", "23. Like squashed insects", "24. Edge", "25. Negligent", "29. Needle hole", "30. Banking device, in brief", "33. Correct, as text", "34. Bullets, e.g.", "36. \"En garde\" weapon", "37. Do wondrous things", "40. \"Cogito ___ sum\"", "41. One who stands to gain a lot?", "42. Matter of fact?", "43. Strong cleaner", "44. Fish steerer", "45. Like some winter sidewalks", "46. Ca++ or Cl-, e.g.", "47. District", "49. \"You'll have to show me\"", "56. Once more", "57. Verdi heroine", "58. Crude group?", "59. Greeting said with a tip of the hat", "60. One-inch news story", "61. District", "62. \"This way\" sign", "63. Muse's instrument", "64. Conclusions"],
        //         "down": ["1. Street's edge", "2. Buckeye State", "3. Hyundai or Honda", "4. Unnamed ones", "5. Invigorating drinks", "6. Hit hard", "7. Raging", "8. Fair to middling", "9. Computer whiz", "10. Sweeper", "11. Involved with", "12. Ready to pluck", "13. ___ Moines", "21. Botch", "22. Funnyman Richard", "25. Force back", "26. Nail filer", "27. Make one", "28. Facts", "29. Kuwaiti chief", "30. Tiptop, on a report card", "31. Saws and laws have them", "32. Netlike", "34. So be it", "35. New millennium year, or a part of 20-, 37- and 49-Across", "36. Drapery color", "38. Big zoo animal", "39. Country album?", "44. In the short term", "45. Kind of seed on a roll", "46. \"Don't mind ___!\"", "47. Friendliness", "48. Equestrian", "49. Composer Stravinsky", "50. Bryn ___, Pa.", "51. Postal delivery", "52. Leak slowly", "53. Abreast of", "54. Tear", "55. Cold desserts", "56. \"So that's it!\""]
        //     },
        //     "code": null,
        //     "copyright": "2001, The New York Times",
        //     "date": "1\/1\/2001",
        //     "dow": "Monday",
        //     "downmap": null,
        //     "editor": "Will Shortz",
        //     "grid": ["C", "O", "A", "T", ".", "T", "W", "A", "S", ".", "T", "B", "I", "R", "D", "U", "H", "U", "H", ".", "O", "H", "N", "O", ".", "E", "R", "N", "I", "E", "R", "I", "T", "E", ".", "N", "A", "G", "S", ".", "C", "O", "O", "P", "S", "B", "O", "O", "M", "M", "I", "C", "R", "O", "P", "H", "O", "N", "E", ".", ".", ".", ".", ".", "I", "C", "K", "Y", ".", "R", "I", "M", ".", ".", ".", "R", "E", "M", "I", "S", "S", ".", ".", "E", "Y", "E", ".", "A", "T", "M", "E", "M", "E", "N", "D", ".", "A", "M", "M", "O", ".", "E", "P", "E", "E", "P", "E", "R", "F", "O", "R", "M", "M", "I", "R", "A", "C", "L", "E", "S", "E", "R", "G", "O", ".", "H", "E", "I", "R", ".", "T", "R", "U", "T", "H", "L", "Y", "E", ".", "F", "I", "N", ".", ".", "S", "L", "U", "S", "H", "Y", ".", ".", ".", "I", "O", "N", ".", "A", "R", "E", "A", ".", ".", ".", ".", ".", "I", "M", "F", "R", "O", "M", "M", "I", "S", "S", "O", "U", "R", "I", "A", "G", "A", "I", "N", ".", "A", "I", "D", "A", ".", "O", "P", "E", "C", "H", "O", "W", "D", "O", ".", "I", "T", "E", "M", ".", "Z", "O", "N", "E", "A", "R", "R", "O", "W", ".", "L", "Y", "R", "E", ".", "E", "N", "D", "S"],
        //     "gridnums": [1, 2, 3, 4, 0, 5, 6, 7, 8, 0, 9, 10, 11, 12, 13, 14, 0, 0, 0, 0, 15, 0, 0, 0, 0, 16, 0, 0, 0, 0, 17, 0, 0, 0, 0, 18, 0, 0, 0, 0, 19, 0, 0, 0, 0, 20, 0, 0, 0, 21, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 25, 26, 27, 28, 0, 0, 0, 0, 29, 0, 0, 0, 30, 31, 32, 33, 0, 0, 0, 0, 0, 34, 35, 0, 0, 0, 36, 0, 0, 0, 37, 0, 0, 0, 0, 38, 0, 0, 0, 0, 39, 0, 0, 0, 0, 40, 0, 0, 0, 0, 41, 0, 0, 0, 0, 42, 0, 0, 0, 0, 43, 0, 0, 0, 44, 0, 0, 0, 0, 45, 0, 0, 0, 0, 0, 0, 0, 0, 46, 0, 0, 0, 47, 48, 0, 0, 0, 0, 0, 0, 0, 49, 50, 0, 0, 0, 51, 0, 0, 0, 0, 52, 53, 54, 55, 56, 0, 0, 0, 0, 0, 57, 0, 0, 0, 0, 58, 0, 0, 0, 59, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 61, 0, 0, 0, 62, 0, 0, 0, 0, 0, 63, 0, 0, 0, 0, 64, 0, 0, 0],
        //     "hold": null,
        //     "id": null,
        //     "id2": null,
        //     "interpretcolors": null,
        //     "jnotes": null,
        //     "key": null,
        //     "mini": null,
        //     "notepad": null,
        //     "publisher": "The New York Times",
        //     "rbars": null,
        //     "shadecircles": null,
        //     "size": {"cols": 15, "rows": 15},
        //     "title": "NY TIMES, MON, JAN 01, 2001",
        //     "track": null,
        //     "type": null
        // })

        const endpoint = `${config.baseUrl}${year}/${month}/${day}.json`

        return axios.get(endpoint).then((response: AxiosResponse) => {

            CrosswordsApi.handleErrors(response);

            return response.data;

        });

    }

    private static handleErrors(response: AxiosResponse) {

        if (response.status === 500) {

            return {error: "serverError"}

        }

        if (response.status === 400) {

            return {error: "authError"}

        }

        if (response.status !== 200) {

            return {error: "error"}

        }

    }


}
