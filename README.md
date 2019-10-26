# userテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|mail|string|null: false|

### Association
- has_many :messages
- has_many :groups.through: :group_user
- has_many :group_user



## groupテーブル
Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users: through: :group_user
- has_many :messages
- has_many :group_user



## group_userテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user



### messageテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

