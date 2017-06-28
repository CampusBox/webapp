(function() {
    'use strict';

    angular.module('app')
        .service('creativityCategories', [
            function() {

                var obj = {};
                obj.items = [];
                obj.itemsMobile = [];
                obj.types = [
                    { 'title': 'Articles', 'id': 1 },
                    { 'title': 'Poetry', 'id': 2 },
                    { 'title': 'Acting', 'id': 3 },
                    { 'title': 'Paint & Colour', 'id': 4 },
                    { 'title': 'Drawing ', 'id': 5 },
                    { 'title': 'Sewing & Fabric', 'id': 6 },
                    { 'title': 'Craft', 'id': 7 },
                    { 'title': 'Dancing', 'id': 8 },
                    { 'title': 'Singing', 'id': 9 },
                    { 'title': 'Instrumental', 'id': 10 },
                    { 'title': 'Digital Music', 'id': 11 },
                    { 'title': 'Decor', 'id': 12 },
                    { 'title': 'Film & Cinema', 'id': 13 },
                    { 'title': 'Video & Animation', 'id': 14 },
                    { 'title': 'Graphics & Digital Art', 'id': 15 },
                    { 'title': 'UI & UX', 'id': 16 },
                    { 'title': 'Websites', 'id': 17 },
                    { 'title': 'Creative Coding', 'id': 18 },
                    { 'title': 'Apps', 'id': 19 },
                    { 'title': 'Electronics & Hardware', 'id': 20 }
                ];
                obj.typesByID = [
                    'Articles',
                    'Poetry',
                    'Acting',
                    'Paint & Colour',
                    'Drawing ',,
                    'Sewing & Fabric',
                    'Craft',
                    'Dancing',
                    'Singing',
                    'Instrumental',
                    'Digital Music',
                    'Decor',
                    'Film & Cinema',
                    'Video & Animation',
                    'Graphics & Digital Art',
                    'UI & UX',
                    'Websites',
                    'Creative Coding',
                    'Apps',
                    'Electronics & Hardware'
                ];
                obj.items[0] = [
                    { 'title': 'Articles', 'id': 1 },
                    { 'title': 'Poetry', 'id': 2 },
                    { 'title': 'Acting', 'id': 3 }
                ];
                obj.items[1] = [
                    { 'title': 'Paint & Colour', 'id': 4 },
                    { 'title': 'Drawing ', 'id': 5 },
                    { 'title': 'Sewing & Fabric', 'id': 6 },
                    { 'title': 'Craft', 'id': 7 }
                    // { 'title': 'Dancing', 'id': 8 }
                ];
                obj.items[2] = [
                    { 'title': 'Dancing', 'id': 8 },
                    { 'title': 'Singing', 'id': 9 },
                    { 'title': 'Instrumental', 'id': 10 },
                    { 'title': 'Digital Music', 'id': 11 },
                    { 'title': 'Decor', 'id': 12 }

                ];
                obj.items[3] = [
                    { 'title': 'Film & Cinema', 'id': 13 },
                    { 'title': 'Video & Animation', 'id': 14 },
                    { 'title': 'Graphics & Digital Art', 'id': 15 },
                    { 'title': 'UI & UX', 'id': 16 }
                ];
                obj.items[4] = [
                    { 'title': 'Websites', 'id': 17 },
                    { 'title': 'Creative Coding', 'id': 18 },
                    { 'title': 'Apps', 'id': 19 },
                    { 'title': 'Electronics & Hardware', 'id': 20 }
                ];
                obj.itemsMobile[0] = [
                    { 'title': 'Articles', 'id': 1 },
                    { 'title': 'Poetry', 'id': 2 },
                    { 'title': 'Acting', 'id': 3 }
                ];
                obj.itemsMobile[1] = [
                    { 'title': 'Paint & Colour', 'id': 4 },
                    { 'title': 'Drawing ', 'id': 5 },
                    { 'title': 'Sewing & Fabric', 'id': 6 },
                ];
                obj.itemsMobile[2] = [
                    { 'title': 'Craft', 'id': 7 },
                    { 'title': 'Dancing', 'id': 8 },
                    { 'title': 'Singing', 'id': 9 },
                    { 'title': 'Instrumental', 'id': 10 }

                ];
                obj.itemsMobile[3] = [
                    { 'title': 'Digital Music', 'id': 11 },
                    { 'title': 'Decor', 'id': 12 },
                    { 'title': 'Film & Cinema', 'id': 13 }
                ];
                obj.itemsMobile[4] = [
                    { 'title': 'Video & Animation', 'id': 14 },
                    { 'title': 'Graphics & Digital Art', 'id': 15 },
                    { 'title': 'UI & UX', 'id': 16 }
                ];
                obj.itemsMobile[5] = [
                    { 'title': 'Websites', 'id': 17 },
                    { 'title': 'Creative Coding', 'id': 18 },
                    { 'title': 'Apps', 'id': 19 }

                ];
                obj.itemsMobile[6] = [
                    { 'title': 'Electronics & Hardware', 'id': 20 }
                ];
                return obj;
            }
        ]);
})();
