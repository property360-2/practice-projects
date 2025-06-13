const forumLatest = 'https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json';
const forumTopicUrl = 'https://forum.freecodecamp.org/t/';
const forumCategoryUrl = 'https://forum.freecodecamp.org/c/';
const avatarUrl = 'https://sea1.discourse-cdn.com/freecodecamp';

const allCategories = {
    299: { category: 'Career Advice', className: 'career' },
    409: { category: 'Project Feedback', className: 'feedback' },
    417: { category: 'freeCodeCamp Support', className: 'support' },
    421: { category: 'JavaScript', className: 'javascript' },
    423: { category: 'HTML - CSS', className: 'html-css' },
    424: { category: 'Python', className: 'python' },
    432: { category: 'You Can Do This!', className: 'motivation' },
    560: { category: 'Backend Development', className: 'backend' }
};

const timeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInMs = now - past;

    const minutes = Math.floor(diffInMs / (1000 * 60));
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    return `${days}d ago`;
};

const viewCount = (views) => {
    if (views >= 1000) return `${Math.floor(views / 1000)}k`;
    return views;
};

const forumCategory = (id) => {
    const { category, className } = allCategories[id] || { category: 'General', className: 'general' };
    return `<a class="category ${className}" href="${forumCategoryUrl}${className}/${id}">${category}</a>`;
};


const avatars = (posters, users) => {
    return posters.map(poster => {
        const user = users.find(u => u.id === poster.user_id);
        if (!user) return '';

        let src = user.avatar_template.replace('{size}', '30');
        if (!src.startsWith('http')) {
            src = `${avatarUrl}${src}`;
        }

        return `<img src="${src}" alt="${user.name}" title="${user.name}" />`;
    }).join('');
};


const showLatestPosts = (data) => {
    const { users, topic_list } = data;
    const { topics } = topic_list;

    const rows = topics.map(topic => {
        const {
            id, title, views, posts_count, slug,
            posters, category_id, bumped_at
        } = topic;

        return `
        <tr>
          <td>
            <a class="post-title" href="${forumTopicUrl}${slug}/${id}">${title}</a>
            ${forumCategory(category_id)}
          </td>
          <td>
            <div class="avatar-container">
              ${avatars(posters, users)}
            </div>
          </td>
          <td>${posts_count - 1}</td>
          <td>${viewCount(views)}</td>
          <td>${timeAgo(bumped_at)}</td>
        </tr>
      `;
    }).join('');

    document.getElementById('posts-container').innerHTML = rows;
};

const fetchData = () => {
    fetch(forumLatest)
        .then(response => response.json()) // parse the JSON from the response
        .then(data => showLatestPosts(data)) // use the parsed data
        .catch(error => console.log(error)); // log if something goes wrong
};


fetchData();
