const blogs = [
  {
    user: 29,
    title: 'Crossing Guard, The',
    blog: 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\\n\\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\\n\\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    imagePath: '/Images/Blogs/blog_1.jpg',
    totalViews: 2
  },
  {
    user: 33,
    title: 'Pink Cadillac',
    blog: 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\\n\\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\\n\\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    imagePath: '/Images/Blogs/blog_2.jpg',
    totalViews: 2
  },
  {
    user: 72,
    title: 'Thief of Paris, The (Le voleur)',
    blog: 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    imagePath: '/Images/Blogs/blog_3.jpg',
    totalViews: 1
  },
  {
    user: 61,
    title: 'Aral, Fishing in an Invisible Sea',
    blog: 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
    imagePath: '/Images/Blogs/blog_4.jpg',
    totalViews: 1
  },
  {
    user: 21,
    title: 'Shanghai',
    blog: 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\\n\\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\\n\\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    imagePath: '/Images/Blogs/blog_5.jpg',
    totalViews: 1
  },
  {
    user: 99,
    title: 'Free Samples',
    blog: 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\\n\\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    imagePath: '/Images/Blogs/blog_7.jpg',
    totalViews: 2
  },
  {
    user: 66,
    title: 'Lone Wolf and Cub: Baby Cart to Hades (Kozure Ôkami: Shinikazeni mukau ubaguruma)',
    blog: 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    imagePath: '/Images/Blogs/blog_8.jpg',
    totalViews: 2
  },
  {
    user: 45,
    title: 'Pirates of the Caribbean: The Curse of the Black Pearl',
    blog: 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\\n\\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\\n\\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    imagePath: '/Images/Blogs/blog_9.jpg',
    totalViews: 1
  },
  {
    user: 40,
    title: 'Get on Up',
    blog: 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    imagePath: '/Images/Blogs/blog_10.jpg',
    totalViews: 4
  },
  {
    user: 2,
    title: 'Cursed',
    blog: 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    imagePath: '/Images/Blogs/blog_11.jpg',
    totalViews: 1
  },
  {
    user: 5,
    title: 'Killer (Bulletproof Heart)',
    blog: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    imagePath: '/Images/Blogs/blog_12.jpg',
    totalViews: 3
  },
  {
    user: 11,
    title: "Witches, The (aka Devil's Own, The)",
    blog: 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\\n\\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\\n\\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    imagePath: '/Images/Blogs/blog_13.jpg',
    totalViews: 1
  },
  {
    user: 31,
    title: 'Love Movie, The (Rakkauselokuva)',
    blog: 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\\n\\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    imagePath: '/Images/Blogs/blog_14.jpg',
    totalViews: 3
  },
  {
    user: 10,
    title: 'Glory to the Filmmaker! (Kantoku · Banzai!)',
    blog: 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    imagePath: '/Images/Blogs/blog_15.jpg',
    totalViews: 3
  }
];

export default blogs;
