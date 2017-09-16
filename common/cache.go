package common

import (
	"time"

	gocache "github.com/patrickmn/go-cache"
)

var cache *gocache.Cache

type CacheCtrl struct {
}

func init() {
	cache = gocache.New(1*time.Minute, 1*time.Minute)
}
func Cache() *CacheCtrl {
	return &CacheCtrl{}
}

//Log return a LogCtrl对象
func (c *BaseCtrl) Cache() *CacheCtrl {
	return &CacheCtrl{}
}
func (c *CacheCtrl) CacheSetConfineTime(key string, val interface{}) {
	cache.Set(key, val, gocache.DefaultExpiration)
}
func (c *CacheCtrl) CacheSetAlwaysTime(key string, val interface{}) {
	cache.Set(key, val, gocache.NoExpiration)
}
func (c *CacheCtrl) CacheGet(key string) (interface{}, bool) {
	val, found := cache.Get(key)
	return val, found
}
func (c *CacheCtrl) CacheDel(key string) {
	cache.Delete(key)
}
