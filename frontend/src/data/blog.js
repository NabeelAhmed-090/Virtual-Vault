const oldArticles = [
    {
        user: 31,
        title: "Love Movie, The (Rakkauselokuva)",
        blog: "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\\n\\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
        imagePath: "/Images/Blogs/blog_14.jpg",
        totalViews: 3
    }, {
        user: 10,
        title: "Glory to the Filmmaker! (Kantoku · Banzai!)",
        blog: "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
        imagePath: "/Images/Blogs/blog_15.jpg",
        totalViews: 3
    }
]

const mostViewed = [
    {
        user: 29,
        title: "Crossing Guard, The",
        blog: "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\\n\\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\\n\\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
        imagePath: "/Images/Blogs/blog_1.jpg",
        totalViews: 2
    }, {
        user: 33,
        title: "Pink Cadillac",
        blog: "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\\n\\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\\n\\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
        imagePath: "/Images/Blogs/blog_2.jpg",
        totalViews: 2
    }, {
        user: 72,
        title: "Thief of Paris, The (Le voleur)",
        blog: "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
        imagePath: "/Images/Blogs/blog_3.jpg",
        totalViews: 1
    }, {
        user: 61,
        title: "Aral, Fishing in an Invisible Sea",
        blog: "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
        imagePath: "/Images/Blogs/blog_4.jpg",
        totalViews: 1
    }, {
        user: 21,
        title: "Shanghai",
        blog: "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\\n\\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\\n\\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
        imagePath: "/Images/Blogs/blog_5.jpg",
        totalViews: 1
    }, {
        user: 99,
        title: "Free Samples",
        blog: "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\\n\\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
        imagePath: "/Images/Blogs/blog_7.jpg",
        totalViews: 2
    }, {
        user: 66,
        title: "Lone Wolf and Cub: Baby Cart to Hades (Kozure Ôkami: Shinikazeni mukau ubaguruma)",
        blog: "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
        imagePath: "/Images/Blogs/blog_8.jpg",
        totalViews: 2
    },
    {
        user: 10,
        title: "Glory to the Filmmaker! (Kantoku · Banzai!)",
        blog: "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
        imagePath: "/Images/Blogs/blog_15.jpg",
        totalViews: 3
    }
]

const latest = [
    {
        user: 45,
        title: "Pirates of the Caribbean: The Curse of the Black Pearl",
        blog: "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\\n\\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\\n\\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
        imagePath: "/Images/Blogs/blog_9.jpg",
        totalViews: 1
    }, {
        user: 40,
        title: "Get on Up",
        blog: "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
        imagePath: "/Images/Blogs/blog_10.jpg",
        totalViews: 4
    }, {
        user: 2,
        title: "Cursed",
        blog: "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
        imagePath: "/Images/Blogs/blog_11.jpg",
        totalViews: 1
    }, {
        user: 5,
        title: "Killer (Bulletproof Heart)",
        blog: "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        imagePath: "/Images/Blogs/blog_12.jpg",
        totalViews: 3
    }, {
        user: 11,
        title: "Witches, The (aka Devil's Own, The)",
        blog: "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\\n\\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\\n\\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        imagePath: "/Images/Blogs/blog_13.jpg",
        totalViews: 1
    },
]


const blogs = {
    mostViewed: mostViewed,
    latest: latest,
    oldArticles: oldArticles,
}

const dummy_blog = {
    _id: "642963b65f9b61eb41e210ae",
    user: "nlawille16",
    title: "Get on Up",
    blog: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, nostrum debitis, aperiam nisi quisquam quos aliquid laudantium sint quis minus cumque cupiditate illum alias est expedita tempore, reiciendis iusto optio ratione dignissimos enim! Molestias odio totam a at corporis amet ab reprehenderit asperiores quae cum incidunt, delectus unde tempore reiciendis quia obcaecati officia voluptatem, quaerat optio illum eos repudiandae! Reprehenderit iste et repellendus sit fugit doloribus! Iste, libero molestias. Quas iusto quisquam expedita illo officiis at quia labore porro vero veniam veritatis iure necessitatibus excepturi quasi fugiat adipisci illum, obcaecati voluptatem ullam tempore est non consequatur. Omnis esse, neque, earum cupiditate ex ipsa in harum deserunt assumenda optio minima expedita, porro ducimus sed aliquam voluptatum mollitia accusamus error eaque. Voluptatum hic saepe animi. Tenetur consequuntur consequatur doloribus, consectetur officia suscipit? Laborum, asperiores! Error ab fuga quae! Inventore ipsa ea quo labore voluptatum minima, fugiat quae cum officia? Delectus, non nisi illum neque porro error accusamus odio illo sit explicabo minima fuga consectetur repellat? Iure accusamus doloremque, dolorum nihil quod dolores similique vero minus inventore obcaecati nemo saepe eveniet voluptas dignissimos maxime voluptates iste, consequatur assumenda tempore! Architecto id libero nulla, suscipit nostrum magni beatae maxime cum nihil similique labore voluptatibus saepe? Quisquam, ratione. Sint aliquid quibusdam illo, et in, ab molestiae suscipit ipsam adipisci fugit aperiam quia quaerat nam ratione earum quas ipsa aut? Porro ad eos dignissimos sequi libero vero nesciunt dolore quia velit quisquam doloribus id tempora placeat repellendus quis incidunt alias, eaque deleniti aperiam. Ipsam, suscipit facere. Reprehenderit accusamus veniam esse ullam asperiores dolorem deserunt, minus ducimus, sit sunt provident autem fugit temporibus nesciunt quis perspiciatis distinctio. Possimus vitae, earum quaerat doloremque iusto nulla accusantium veritatis. Expedita officia temporibus nesciunt omnis iusto, vel, ipsum accusamus magni quam ipsam, hic maiores. Cum quae sequi ducimus porro consequatur aperiam inventore? Debitis facilis consequatur dignissimos vel enim odio quasi esse porro earum nisi officiis, ipsam ea labore incidunt modi nam nesciunt quam officia! Quisquam mollitia repudiandae adipisci distinctio molestiae. Rem voluptas facere aut at quae, suscipit explicabo dolore facilis soluta aliquid veritatis quod repellendus nulla error itaque cupiditate provident magnam, consequatur quia nisi? Alias laudantium optio aut non, at blanditiis autem dolore itaque modi ea eos molestiae quisquam minima. Iusto explicabo, ipsum ea hic, voluptatibus et nostrum a, sunt inventore quasi iure dolores nemo harum labore provident accusamus sapiente excepturi vel. Laudantium voluptatem inventore consectetur qui beatae tenetur adipisci quidem doloremque reiciendis nemo ipsam culpa numquam quas ut nisi possimus, reprehenderit minus ab necessitatibus id odit cum vitae vel. Nesciunt, repellat in. Doloribus neque aliquam, maxime quibusdam beatae unde molestiae, est praesentium blanditiis provident magnam accusantium. Illum quam reprehenderit ducimus, inventore non facere soluta delectus laborum harum saepe earum aliquam labore numquam quaerat iure sed molestiae ipsum nostrum possimus. Quo ipsa molestias a aliquam nam, quibusdam nemo repellat facere, cupiditate natus asperiores enim eligendi dolor, dignissimos mollitia ipsum cum quam molestiae. Tenetur aperiam recusandae, culpa aut natus, aspernatur praesentium, quas pariatur neque eligendi blanditiis doloremque accusantium atque veniam hic officiis.",
    imagePath: "/Images/Blogs/blog_10.jpg",
    totalViews: 4,
    date: "Mon Apr 03 2023 20:22:48 GMT+0500 (Pakistan Standard Time)"
}




export default { blogs, dummy_blog }


