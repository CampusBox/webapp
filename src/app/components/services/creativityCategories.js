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
                    { 'title': 'Drama', 'id': 3 },
                    { 'title': 'Paint and Colour', 'id': 4 },
                    { 'title': 'Drawing ', 'id': 5 },
                    { 'title': 'Sewing and Fabric', 'id': 6 },
                    { 'title': 'Craft', 'id': 7 },
                    { 'title': 'Dancing', 'id': 8 },
                    { 'title': 'Singing', 'id': 9 },
                    { 'title': 'Instrumental', 'id': 10 },
                    { 'title': 'Digital Music', 'id': 11 },
                    { 'title': 'Decor', 'id': 12 },
                    { 'title': 'Film and Video', 'id': 13 },
                    { 'title': 'Animation', 'id': 14 },
                    { 'title': 'Graphics', 'id': 15 },
                    { 'title': 'UI and UX', 'id': 16 },
                    { 'title': 'Websites', 'id': 17 },
                    { 'title': 'Programming', 'id': 18 },
                    { 'title': 'Apps', 'id': 19 },
                    { 'title': 'Electronics', 'id': 20 },
                    { 'title': 'DIY', 'id': 21 }
                ];
                obj.items[0] = [
                    { 'title': 'Articles', 'id': 1 },
                    { 'title': 'Poetry', 'id': 2 },
                    { 'title': 'Drama', 'id': 3 }
                ];
                obj.items[1] = [
                    { 'title': 'Paint and Colour', 'id': 4 },
                    { 'title': 'Drawing ', 'id': 5 },
                    { 'title': 'Sewing and Fabric', 'id': 6 },
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
                    { 'title': 'Film and Video', 'id': 13 },
                    { 'title': 'Animation', 'id': 14 },
                    { 'title': 'Graphics', 'id': 15 },
                    { 'title': 'UI and UX', 'id': 16 },
                    { 'title': 'Websites', 'id': 17 }
                ];
                obj.items[4] = [
                    { 'title': 'Programming', 'id': 18 },
                    { 'title': 'Apps', 'id': 19 },
                    { 'title': 'Electronics', 'id': 20 },
                    { 'title': 'DIY', 'id': 21 }
                ];
                obj.itemsMobile[0] = [
                    { 'title': 'Articles', 'id': 1 },
                    { 'title': 'Poetry', 'id': 2 },
                    { 'title': 'Drama', 'id': 3 }
                ];
                obj.itemsMobile[1] = [
                    { 'title': 'Paint and Colour', 'id': 4 },
                    { 'title': 'Drawing ', 'id': 5 },
                    { 'title': 'Sewing and Fabric', 'id': 6 },
                ];
                obj.itemsMobile[2] = [
                    { 'title': 'Craft', 'id': 7 },
                    // { 'title': 'Dancing', 'id': 8 },
                    { 'title': 'Dancing', 'id': 8 },
                    { 'title': 'Singing', 'id': 9 },
                    { 'title': 'Instrumental', 'id': 10 }

                ];
                obj.itemsMobile[3] = [
                    { 'title': 'Digital Music', 'id': 11 },
                    { 'title': 'Decor', 'id': 12 },
                    { 'title': 'Film and Video', 'id': 13 }
                ];
                obj.itemsMobile[4] = [
                    { 'title': 'Animation', 'id': 14 },
                    { 'title': 'Graphics', 'id': 15 },
                    { 'title': 'UI and UX', 'id': 16 }
                ];
                obj.itemsMobile[5] = [
                    { 'title': 'Websites', 'id': 17 },
                    { 'title': 'Programming', 'id': 18 },
                    { 'title': 'Apps', 'id': 19 }

                ];
                obj.itemsMobile[6] = [
                    { 'title': 'Electronics', 'id': 20 },
                    { 'title': 'DIY', 'id': 21 }
                ];
                return obj;
            }
        ]);
})();
