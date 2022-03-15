import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

export default {
  getRoutes: async () => {
    let posts = [];
    const postPath = 'src/content';
    const paths = fs.readdirSync(postPath);

    posts = paths.map(file => {
      const fileData = matter.read(postPath + '/' + file);
      const slug = "/" + file.replace(/\.md?$/, '');
      return {
        slug: slug,
        ...fileData
      };
    })

    return [
      {
        path: '/blog',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/post${post.slug}`,
          template: 'src/containers/Post',
          getData: () => ({
            post,
          }),
        })),
      },
    ]
  },
  plugins: [
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
    [
      'react-static-plugin-sass',
      {
        includePaths: ['/src/scss']
      }
    ]
  ],
}
